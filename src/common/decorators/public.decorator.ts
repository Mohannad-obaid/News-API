import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IsPublic';
export const ROLES_KEY = 'Roles';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
