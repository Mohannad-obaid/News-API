import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
