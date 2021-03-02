import { ApiProperty } from "@nestjs/swagger";

export class Test {
  @ApiProperty()
  type: any;
  @ApiProperty()
  title: string;
  @ApiProperty()
  questions: Array<Question>;
  @ApiProperty()
  results: Record<string, string>;
  @ApiProperty()
  keys: Array<string>;
  @ApiProperty()
  name: string;
}

export class Question {
  query: string;
  answers: Array<Answer>;
}

export class Answer {
  text: string;
  values: Record<string, number>;
}