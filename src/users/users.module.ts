import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserResolver } from './user.resolver';
import { CounterSchema } from 'src/utils/counters/schemas/counter.schema';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Counter', schema: CounterSchema }
    ])
  ],
  exports: [UserService]
})
export class UsersModule {}
