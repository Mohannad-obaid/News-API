// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
//
// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    // تأكد أن النتيجة دائمًا من نوع Promise أو Boolean
    return (await super.canActivate(context)) as boolean;
  }
}
