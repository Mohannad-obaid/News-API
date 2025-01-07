import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from '../auth/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUser(): Promise<User[]> {
    return this.userModel.find();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const isUserExist: boolean = await this.checkUserExist(user.email);
    if (isUserExist) {
      throw new NotFoundException('User already exists');
    }

    const newUser = await this.userModel.create(user);
    await newUser.save();

    if (!newUser) {
      throw new Error('User not created');
    }

    return newUser;
  }

  async register(body: SignUpDto) {
    const isUserExist: boolean = await this.checkUserExist(body.email);
    if (isUserExist) {
      throw new NotFoundException('User already exists');
    }

    const user = {
      name: body.name,
      email: body.email,
      password: body.password,
    };
    const userReg = await this.userModel.create(user);
    await userReg.save();

    if (!userReg) {
      throw new Error('User not created');
    }

    return userReg;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return user;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      user,
      {
        new: true,
      },
    );
    if (!updatedUser) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return deletedUser;
  }

  async findUserByEmail(email: string): Promise<User> {
    console.log('email :', email);
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new NotFoundException(`Not found user ${email}`);
    }
    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) {
      throw new NotFoundException(`Not found user ${username}`);
    }
    return user;
  }

  async updateRole(id: string, role: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { role: role },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`Not found user ${id}`);
    }

    return updatedUser;
  }

  async checkUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }
}
