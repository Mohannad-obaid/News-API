import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DevExceptionsFilter } from './common/filters/custom-excrption.filter';
import { authGuard } from './common/guards/auth.guard';
import { JwtAuthGuard } from './common/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');
  await app.listen(port);
  if (process.env.NODE_ENV === 'development') {
    app.useGlobalFilters(new DevExceptionsFilter());
    console.log('DevExceptionsFilter is enabled in development mode');
  }

  const refelector = app.get(Reflector);

  // app.useGlobalGuards(new JwtAuthGuard(), new authGuard(refelector));
}
bootstrap().then(() => console.log('Server is running on port 3000'));
