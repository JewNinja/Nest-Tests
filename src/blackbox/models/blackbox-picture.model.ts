import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlackboxPictures {
  @Field(type => [String])
  images_paths: [string]; 
}