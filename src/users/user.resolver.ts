import { Args, Query, Resolver } from '@nestjs/graphql';
import { HttpException, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { UserModel } from "./models/users.model";
import { GraphqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserService } from './users.service';


@UseGuards(GraphqlAuthGuard)
@Resolver(of => String)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query(returns => UserModel)
  async giveUserDetails(
    @Args('id', { type: () => String, nullable: true }) id: string,
    @Args('email', { type: () => String, nullable: true }) email: string
  ) {
    if (!id && !email) {
      return new HttpException('Error', 404);
    }

    if (id) {
      var result = await this.userService.findOne({_id: new ObjectId(id)});
    } else {
      var result = await this.userService.findOne({email});
    }

    if (result === null) {
      throw new HttpException('Error', 404);
    }
    return result
  }
}