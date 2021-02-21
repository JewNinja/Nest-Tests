import * as mongoose from 'mongoose';
import { typeEnum } from '../enums/type.enum';

export const TestSchema = new mongoose.Schema({
  // _id: {type: String, required: false},
  type: { type: String, required: true, enum: Object.values(typeEnum) },
  title: { type: String, required: true },
  questions: { type: Array, required: true },
  results: { type: Object, required: true },
  keys: { type: Array, required: true },
  name: { type: String, required: true },
});

// UserSchema.index({ email: 1 }, { unique: true });
