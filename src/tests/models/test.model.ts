import { Field } from '@nestjs/graphql';

export class TestModel {
  @Field(type => String)
  type: string;
  @Field(type => String)
  title: string;
  @Field(type => [QuestionModel])
  questions: Array<QuestionModel>;
  @Field(type => Object)
  results: Record<string, string>;
  @Field(type => [String])
  keys: Array<string>;
  @Field(type => String)
  name: string;
}

export class QuestionModel {
  @Field(type => String)
  query: string;
  @Field(type => [AnswerModel])
  answers: Array<AnswerModel>;
}

export class AnswerModel {
  @Field(type => String)
  text: string;
  @Field(type => Object)
  values: Record<string, number>;
}