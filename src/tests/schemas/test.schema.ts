import * as mongoose from 'mongoose';
import { typeEnum } from '../enums/type.enum';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

// МОЖНО ТАК
export const TestSchema = new mongoose.Schema({
  // _id: {type: String, required: false},
  type: { type: String, required: true, enum: Object.values(typeEnum) },
  title: { type: String, required: true },
  questions: { type: Array, required: true },
  results: { type: Object, required: true },
  keys: { type: Array, required: true },
  name: { type: String, required: true },
});

// МОЖНО ТАК
// export type TestDocument = Test & mongoose.Document
//
// @Schema()
// export class Test {
//   @Prop()
//   type: any;
//
//   @Prop()
//   title: string;
//
//   @Prop()
//   questions: Array<any>;
//
//   @Prop()
//   results: any;
//
//   @Prop()
//   keys: Array<any>;
//
//   @Prop()
//   name: string;
// }
// export const UserSchema = SchemaFactory.createForClass(Test);

// UserSchema.index({ email: 1 }, { unique: true });
