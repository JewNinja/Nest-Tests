import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: Array, required: true },
  blackbox: { type: Object, required: true },
});

UserSchema.index({ email: 1 }, { unique: true });
