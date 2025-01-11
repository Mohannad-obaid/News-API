import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { DevExceptionsFilter } from './common/filters/custom-excrption.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');
  await app.listen(port);
  if (process.env.NODE_ENV === 'development') {
    app.useGlobalFilters(new DevExceptionsFilter());
    console.log('DevExceptionsFilter is enabled in development mode');
  }
  app.useGlobalGuards(new JwtAuthGuard());
}
bootstrap().then(() => console.log('Server is running on port 3000'));
