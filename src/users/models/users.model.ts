import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class BlackboxData {
  @Field(type => Boolean)
  is_used: boolean;
  @Field(type => [String])
  pictures: [string];
  @Field(type => String)
  added_picture: string;
}

@ObjectType()
export class UserModel {
  @Field(type => Number)
  id: number;
  @Field(type => String)
  email: string;
  @Field(type => [String])
  roles: [string];
  @Field(type => BlackboxData)
  blackbox: BlackboxData;
}