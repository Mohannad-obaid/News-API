import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailOptions } from 'src/shared/interfaces/email-options.interface';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(options: EmailOptions): Promise<void> {
    // إعداد transporter باستخدام ConfigService
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: true, // استخدم secure إذا كان SMTP يعمل على SSL
      auth: {
        user: this.configService.get<string>('SMTP_EMAIL'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });

    // خيارات البريد الإلكتروني
    const emailOptions = {
      from: this.configService.get<string>('SMTP_FROM_EMAIL'),
      to: options.email,
      subject: options.subject,
      // text: options.message,
      html: options.message,
    };

    // إرسال البريد الإلكتروني
    await transporter.sendMail(emailOptions);
  }
}
