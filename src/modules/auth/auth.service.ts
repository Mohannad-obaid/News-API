import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SanitizedUserDto } from './dto/login-response.dto';
import { SignUpDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { EmailService } from '../../shared/services/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private EmailService: EmailService,
  ) {}

  async register(body: SignUpDto) {
    await this.userService.register(body);

    return { message: 'Registration successful. Please login.' };
  }

  async login(body: LoginDto) {
    // Validate the user
    const user = await this.validateUser(body);

    // create payload
    const payload = { sub: user._id, email: user.email, role: user.role };

    // Create a token
    let token: string;
    try {
      token = this.jwtService.sign(payload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Error creating token');
    }

    return { user: new SanitizedUserDto(user), token };
  }

  async validateUser(payload: LoginDto) {
    let user;

    if (payload.email) {
      user = await this.userService.findUserByEmail(payload.email);
    }

    if (user && (await bcrypt.compare(payload.password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async forgotPassword(email: string) {
    // check if user exists
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 2. If user exists, generate random token
    const token = Math.floor(100000 + Math.random() * 900000); //Math.random().toString(36).substring(2);

    // 3. Hash the token
    const hashedReasetCode = crypto
      .createHash('sha256')
      .update(token.toString())
      .digest('hex');

    // 4. Store the hashed token in the database
    user.passwordResetCode = hashedReasetCode;
    user.passwordResetExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.passwordResetVerified = false;

    await user.save();

    // 5. Send the token to the user's email
    const messageFormatted = `
  <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border: 1px solid #dddddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #4CAF50;
      margin-bottom: 20px;
    }
    .divider {
      height: 2px;
      background-color: #4CAF50;
      margin: 20px 0;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
    }
    .reset-code {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      color: #4CAF50;
      margin: 20px 0;
    }
    .footer {
      font-size: 14px;
      color: #777777;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      PASSWORD RESET REQUEST
    </div>
    <div class="content">
      <p>Dear <strong>${user.name}</strong>,</p>
      <p>We received a request to reset your password. Please find your reset code below:</p>
      <div class="reset-code">
        ${token}
      </div>
      <p>This code is valid for <strong>10 minutes</strong>.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    </div>
    <div class="divider"></div>
    <div class="footer">
      Thank you,<br>
      The [Your App Name] Team
    </div>
  </div>
</body>
</html>

`;

    try {
      await this.EmailService.sendEmail({
        email: user.email,
        subject: 'Password Reset Code :',
        message: messageFormatted,
      });
    } catch (err) {
      user.passwordResetCode = undefined;
      user.passwordResetExpire = undefined;
      user.passwordResetVerified = undefined;
      await user.save();
      console.error(err);
      throw new Error('Email could not be sent');
    }

    return { message: 'Reset code sent to your email' };
  }

  async verifyResetCode(email: string, code: string) {
    // 1) get user based on reset code
    const hashedReasetCode = await crypto
      .createHash('sha256')
      .update(code)
      .digest('hex');

    const user = await this.userModel.findOne({
      email,
      passwordResetCode: hashedReasetCode,
      passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid code or code expired');
    }

    // 2)  Reset code valid or not
    user.passwordResetVerified = true;
    await user.save();

    return { message: 'Code verified successfully' };
  }

  async resetPassword(email: string, password: string) {
    // 1) get user based on email
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('Not found user');
    }

    // 2) check if code verified
    if (!user.passwordResetVerified) {
      throw new UnauthorizedException('Please verify your code first');
    }

    // 3) update password
    user.password = password;
    user.passwordResetCode = undefined;
    user.passwordResetExpire = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    return {
      status: 'Password reset successfully',
      massage: 'please login again',
    };
  }
}
