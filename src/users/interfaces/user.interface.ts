import mongoose, { Document } from 'mongoose';

export interface INewUser extends Document { // TODO: добавить userId с автоинкриментом
  readonly email: string;
  readonly password: string;
  readonly roles: Array<string>;
}

export interface IUser extends INewUser {
  readonly _id: mongoose.Types.ObjectId;
}

