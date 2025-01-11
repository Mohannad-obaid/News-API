import { IsEmail, IsString, Length, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

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
  @IsEnum(Role)
  readonly role: Role;
}
