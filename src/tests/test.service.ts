import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITest } from './interfaces/test.interface';
import { Model } from 'mongoose';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(@InjectModel('Test') private readonly testModel: Model<ITest>) {}

  async find(order, filter, page, perPage): Promise<any> {
    return await this.testModel
      .find()
      .sort({ _id: 'asc' })
      .skip(--page * perPage)
      .limit(perPage)
      .exec();
  }

  async create(test: CreateTestDto): Promise<ITest> {
    debugger;
    const createdTest = new this.testModel(test);
    debugger;
    return await createdTest.save(); // TODO: почему save, а не create?
  }

  async update(id: string, test: UpdateTestDto): Promise<ITest> { // TODO: возвращаемые типы поправить
    debugger;
    const res = this.testModel.findByIdAndUpdate(id, test, { new: true });
    debugger;
    return res;
  }

  async delete(id): Promise<any> {
    debugger;
    const res = await this.testModel.deleteOne({ _id: id });
    // const res = await this.testModel.findByIdAndRemove(id);

    if (res.deletedCount === 1) {
      return HttpStatus.OK;
    } else {
      return HttpStatus.NOT_FOUND;
    }
  }

  async busy(field, value): Promise<any> {
    const res = await this.testModel
      .find({ [field]: value })
      .limit(10)
      .exec();
    debugger;
    if (!res) {
      return false;
    } else if (res.length === 0) {
      return 'free';
    } else {
      return 'busy';
    }
  }
}
