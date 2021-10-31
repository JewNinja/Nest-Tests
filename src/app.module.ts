import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TestModule } from './tests/test.module';
import { BlackboxModule } from './blackbox/blackbox.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { configModule } from './configure.root';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './tests/middleware/logger.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    TestModule,
    BlackboxModule,
    UsersModule,
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
      // так можно форматировать ошибки graphQL
      // для более нормального вида
      // formatError: (error: GraphQLError) => {
      //   const graphQLFormattedError: GraphQLFormattedError = {
      //     message: error.extensions.exception?.response?.message || error.message,
      //     // @ts-ignore
      //     statusCode: error.extensions?.code || "SERVER_ERROR",
      //     name: error.extensions?.exception?.name || error.name,
      //   };
      //   return graphQLFormattedError;
      // },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public/'),
      serveRoot: '/static/'
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
