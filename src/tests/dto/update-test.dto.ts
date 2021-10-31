import { ArrayNotEmpty, IsNotEmptyObject, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionModel } from '../models/test.model';

export class UpdateTestDto {
  @IsString()
  @ApiProperty()
  readonly type: string;

  @IsString()
  @MaxLength(128, {message: "Title must be less than 128."})
  @ApiProperty()
  readonly title: string;

  @ArrayNotEmpty()
  @ApiProperty({ description: 'Array<IQuestion>' })
  readonly questions: Array<QuestionModel>;

  @IsNotEmptyObject()
  @ApiProperty({ example: {}, description: 'Record<string, string>' })
  readonly results: Record<string, string>;

  @ArrayNotEmpty()
  @ApiProperty()
  readonly keys: Array<string>;

  @ApiProperty()
  readonly name: string;
}
