import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20, { message: 'Password must be at least 8 characters long' })
  password: string;
}
