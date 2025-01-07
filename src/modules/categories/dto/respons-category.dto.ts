import { Expose, Exclude } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Exclude()
  password: string;
  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
