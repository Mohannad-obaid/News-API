import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUrl,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateAdDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsUrl()
  @IsNotEmpty()
  redirectUrl: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
