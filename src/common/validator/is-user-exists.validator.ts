import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../modules/user/schema/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserExists implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validate(userId: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    return !!user;
  }

  defaultMessage(args: ValidationArguments): string {
    return `User with ID "${args.value}" does not exist.`;
  }
}
