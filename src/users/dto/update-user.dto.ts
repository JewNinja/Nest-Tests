import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email?: string;
  password?: string;
  blackbox?: {
    is_used: boolean,
    pictures: Array<string>,
    added_picture: string 
  }
}
