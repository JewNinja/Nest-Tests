import * as mongoose from 'mongoose';

export const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  expiresIn: { type: Date, required: true },
});

RefreshTokenSchema.index({ refreshToken: 1, userId: 1 }, { unique: true });