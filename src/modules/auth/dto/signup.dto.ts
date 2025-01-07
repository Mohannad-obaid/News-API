import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 12, { message: 'Password must be at least 8 characters long ' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20, { message: 'Password must be at least 8 characters long' })
  password: string;
}
