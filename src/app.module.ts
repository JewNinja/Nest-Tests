import { Module } from '@nestjs/common';
import { TestModule } from './tests/test.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    TestModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
