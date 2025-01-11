import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, ROLES_KEY } from '../../decorators/public.decorator';

@Injectable()
export class JwtAndRolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  // تعديل return type ليكون Promise<boolean> بدلاً من boolean مباشرة
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // تحقق من JWT أولاً باستخدام الـ JwtAuthGuard
    const canActivateJwt = await super.canActivate(context);

    // إذا كان التحقق من الـ JWT فشل، فإرجاع false
    if (!canActivateJwt) {
      return false;
    }

    // تحقق من الأدوار بعد التحقق من JWT
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const user = request.user;

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // إذا لم تكن هناك أدوار مطلوبة، فالسماح بالوصول
    }

    if (!user || !user.role) {
      throw new ForbiddenException(
        'You do not have access to this resource, please login',
      );
    }

    const hasRole = requiredRoles.some((role) => user.role.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;
  }
}
