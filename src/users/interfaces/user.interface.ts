import mongoose, { Document } from 'mongoose';

export interface INewUser extends Document {
  readonly email: string;
  readonly password: string;
  readonly id: number;
  readonly roles: Array<string>;
  readonly blackbox: {
    is_used: boolean,
    pictures: Array<string>,
    added_picture: string | null
  };
}

export interface IUser extends INewUser {
  readonly _id: mongoose.Types.ObjectId;
}

