import { Document } from 'mongoose';

export interface ITest extends Document {
  readonly type: any;
  readonly title: string;
  readonly questions: Array<IQuestion>;
  readonly results: Record<string, string>;
  readonly keys: Array<string>;
  readonly name: string;
}

export interface IQuestion {
  readonly query: string;
  readonly answers: Array<IAnswer>;
}

export interface IAnswer {
  readonly text: string;
  readonly values: Record<string, number>;
}
