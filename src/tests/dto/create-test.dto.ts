import { IQuestion } from '../interfaces/test.interface';
import { IsString } from 'class-validator';

export class CreateTestDto {
  @IsString()
  readonly type: string;
  @IsString()
  readonly title: string;
  readonly questions: Array<IQuestion>;
  readonly results: Record<string, string>;
  readonly keys: Array<string>;
  readonly name: string;
}
