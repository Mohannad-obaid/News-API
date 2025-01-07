import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // async protect(token: string) {}
  //
  // matchRoles(requiredRoles: string[], userRoles: string[]) {
  //   return requiredRoles.some((role) => userRoles.includes(role));
  // }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() loginDto: SignUpDto) {
    return this.authService.register(loginDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; password: string }) {
    return this.authService.resetPassword(body.email, body.password);
  }

  @Post('verifyResetCode')
  async verifyResetCode(@Body() body: { email: string; code: string }) {
    return this.authService.verifyResetCode(body.email, body.code);
  }
}
