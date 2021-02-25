import { IsString, IsDateString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateRefreshTokenDto {
  @IsString()
  refreshToken: string;
  @IsString()
  userId: mongoose.Types.ObjectId;
  @IsDateString()
  expireAt: string;
}