import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async findOne(param): Promise<IUser> {
    return await this.userModel
      .findOne(param)
      .exec();
  }

  create(user: CreateUserDto): Promise<IUser> {
    return new this.userModel(user).save();
  }
}
