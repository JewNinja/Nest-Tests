import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { getNextSequenceValue } from 'src/utils/counters/get-next-sequence-value';
import { ICounter } from 'src/utils/counters/interfaces/counter.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Counter') private readonly counterModel: Model<ICounter>,
  ) {}

  async findOne(param): Promise<IUser | null> {
    return await this.userModel
      .findOne(param)
      .exec();
  }

  async create(user: CreateUserDto): Promise<IUser> {
    // return new this.userModel({       // отрабатывает так же
    //   ...user,
    //   roles: ['user'],
    //   blackbox: {
    //     is_used: false,
    //     pictures: [],
    //     added_picture: null
    //   }
    // }).save();

    return this.userModel.create({
      ...user,
      id: await getNextSequenceValue(this.counterModel, 'users'),
      roles: ['user'],
      blackbox: {
        is_used: false,
        pictures: [],
        added_picture: null
      }
    });
  }

  async update(filter, update: UpdateUserDto): Promise<IUser> {
    return await this.userModel.findOneAndUpdate(filter, update, { new: true });
  }
}
