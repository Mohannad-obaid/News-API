import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../../modules/categories/categories.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class DoCategoriesExist implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoriesService) {}

  async validate(
    categoryId: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    if (!categoryId) {
      console.error('categoryId is undefined or empty.');
      return false;
    }

    console.log('Validating categoryId:', categoryId);
    const foundCategory = await this.categoryService.findOne(categoryId);

    console.log('Found category:', foundCategory);
    return !!foundCategory;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Category not exist.`;
  }
}
