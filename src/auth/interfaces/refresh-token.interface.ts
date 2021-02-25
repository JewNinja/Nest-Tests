import { Document } from 'mongoose';

export interface IRefreshToken extends Document {
  readonly refreshToken: string;
  readonly userId: string;
  readonly expiresIn: string;
}