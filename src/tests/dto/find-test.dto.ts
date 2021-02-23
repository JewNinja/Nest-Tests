import { IQuestion } from '../interfaces/test.interface';
import { IsString } from 'class-validator';

export class FindTestDto {
  page: number;
  perPage: number;
}
