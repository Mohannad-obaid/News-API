import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { authGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: authGuard },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class CommonModule {}
