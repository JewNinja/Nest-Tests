import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITest } from './interfaces/test.interface';
import { Model } from 'mongoose';
import { FindTestDto } from './dto/find-test.dto';

@Injectable()
export class TestService {
  constructor(@InjectModel('Test') private readonly testModel: Model<ITest>) {
    console.log(this.testModel);
  }

  async find(order, filter, page, perPage): Promise<any> {
    return await this.testModel
      .find()
      .sort({ _id: 'asc' })
      .skip(--page * perPage)
      .limit(perPage)
      .exec();
  }
}
