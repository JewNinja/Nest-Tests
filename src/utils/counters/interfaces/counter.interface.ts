import { Document } from 'mongoose';

export interface ICounter extends Document {
  readonly sequence_value: number;
}
