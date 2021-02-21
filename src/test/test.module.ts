import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestSchema } from './schemas/test.schema';

@Module({
  providers: [TestService],
  controllers: [TestController],
  imports: [MongooseModule.forFeature([{ name: 'Test', schema: TestSchema }])],
  exports: [],
})
export class TestModule {}
