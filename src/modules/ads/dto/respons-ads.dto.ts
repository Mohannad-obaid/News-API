import { Expose, Exclude } from 'class-transformer';

export class ResponseCategoryDto {
  @Expose()
  name: string;

  @Expose()
  image: string;

  @Exclude()
  isActive: boolean;

  constructor(partial: Partial<ResponseCategoryDto>) {
    Object.assign(this, partial);
  }
}
