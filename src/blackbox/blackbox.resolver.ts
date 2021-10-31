import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from "apollo-server-express"
import { BlackboxService } from './blackbox.service';
import { BlackboxPictures } from "./models/blackbox-picture.model";
import { GraphqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@UseGuards(GraphqlAuthGuard)
@Resolver('Blackbox')
export class BlackboxResolver {
  constructor(
    private blackboxService: BlackboxService,
  ) {}

  @Mutation(returns => Boolean)
  async addBlackboxPicture(
    @Args({name: 'file', type: () => GraphQLUpload}) file: FileUpload,
    @Context() context
  ): Promise<boolean> {
    return this.blackboxService.addPicture(file, context);
  }

  @Query(returns => BlackboxPictures, { name: 'giveBlackboxPictures' }) // с помощью name можно дать псевданим для Query и делать запрос через него
  async giveBlackboxPictures(
    @Args('number') number: number,
    @Context() context
  ) {
    return this.blackboxService.givePictures(number, context);
  }
}