import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from '../user/schema/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '../../shared/services/email.service';

@Module({
  providers: [AuthService, UserService, JwtStrategy, EmailService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // تأكد من استيراد ConfigModule
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'), // استرجاع secret من ConfigService
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'), // استرجاع expiresIn مع قيمة افتراضية
        },
      }),
    }),
  ],
})
export class AuthModule {}
