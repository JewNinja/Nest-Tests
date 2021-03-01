import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: Array, required: true }
});

UserSchema.index({ email: 1 }, { unique: true });
