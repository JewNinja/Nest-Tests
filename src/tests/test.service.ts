import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITest } from './interfaces/test.interface';
import { Model } from 'mongoose';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(@InjectModel('Test') private readonly testModel: Model<ITest>) {}

  async find(order, filter, page, perPage): Promise<ITest[]> {
    return await this.testModel
      .find()
      .sort({ _id: 'asc' })
      .skip(--page * perPage)
      .limit(perPage)
      .exec();
  }

  async create(test: CreateTestDto): Promise<ITest> {
    const createdTest = new this.testModel(test);

    return await createdTest.save();
  }

  async update(id: string, test: UpdateTestDto): Promise<ITest> {
    return this.testModel.findByIdAndUpdate(id, test, { new: true });
  }

  async delete(id): Promise<number> {
    const res = await this.testModel.deleteOne({ _id: id });
    // const res = await this.testModel.findByIdAndRemove(id);

    if (res.deletedCount === 1) {
      return HttpStatus.OK;
    } else {
      return HttpStatus.NOT_FOUND;
    }
  }

  async busy(field, value): Promise<string | boolean> {
    const res = await this.testModel
      .find({ [field]: value })
      .limit(10)
      .exec();

    if (!res) {
      return false;
    } else if (res.length === 0) {
      return 'free';
    } else {
      return 'busy';
    }
  }
}
