import { IQuestion } from '../interfaces/test.interface';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
  @IsString()
  @ApiProperty()
  readonly type: string;
  @IsString()
  @ApiProperty()
  readonly title: string;
  @ApiProperty({ example: [], description: 'Array<IQuestion>' })
  readonly questions: Array<IQuestion>; // TODO: переделать интерфейсы на классы
  @ApiProperty({ example: {}, description: 'Record<string, string>' })
  readonly results: Record<string, string>;
  @ApiProperty()
  readonly keys: Array<string>;
  @ApiProperty()
  readonly name: string;
}
