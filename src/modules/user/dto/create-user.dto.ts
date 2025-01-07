import { IsEmail, IsString, Length, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../../common/enums/user-roles.enum';

export class CreateUserDto {
  @IsString()
  @Length(3, 12)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;

  @IsString()
  @IsEnum(UserRole)
  readonly role: UserRole;
}
