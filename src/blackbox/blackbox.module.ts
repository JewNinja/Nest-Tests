  
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BlackboxResolver } from './blackbox.resolver';
import { BlackboxService } from './blackbox.service';

@Module({
  imports: [UsersModule],
  providers: [BlackboxResolver, BlackboxService],
})
export class BlackboxModule {}