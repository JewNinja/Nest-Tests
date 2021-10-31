import * as mongoose from 'mongoose';

export const CounterSchema = new mongoose.Schema({
  sequence_value: { type: Number, required: true },
});
