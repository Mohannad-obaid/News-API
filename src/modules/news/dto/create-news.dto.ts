import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNotEmpty,
  IsMongoId,
  Validate,
} from 'class-validator';
import { IsUserExists } from '../../../common/validator/is-user-exists.validator';
import { DoCategoriesExist } from '../../../common/validator/is-categories-exist.validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsOptional()
  readonly summary?: string;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsMongoId()
  @IsNotEmpty()
  //@Validate(DoCategoriesExist)
  readonly category: string;

  @IsMongoId()
  @IsNotEmpty()
  //@Validate(IsUserExists)
  readonly author: string;

  @IsBoolean()
  @IsOptional()
  readonly isPublished?: boolean;
}
