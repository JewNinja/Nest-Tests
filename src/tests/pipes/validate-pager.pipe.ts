
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidatePagerPipe implements PipeTransform<any> {
  keys = []
  constructor(...keys: string[]) {
    this.keys = keys;
  }

  async transform(query: any, arg: ArgumentMetadata) {
    this.keys.forEach(key => {
      if (query[key]) {
        if (isNaN(+query[key]) || +query[key] <= 0) throw new BadRequestException(`${key} is not a valid`);
        else query[key] = +query[key]
      }
    })
    return query;
  }
}
