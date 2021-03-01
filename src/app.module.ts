import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TestModule } from './tests/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { configModule } from './configure.root';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './tests/middleware/logger.middleware';

@Module({
  imports: [
    TestModule,
    UsersModule,
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes('tests');
      // .forRoutes('');
      .forRoutes('other');
  }
}
