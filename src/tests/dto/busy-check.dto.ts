import { IQuestion } from '../interfaces/test.interface';
import { IsString } from 'class-validator';

export class BusyCheckDto {
  @IsString()
  key: string;
  @IsString()
  value: string;
}
