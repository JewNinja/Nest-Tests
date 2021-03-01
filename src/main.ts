import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    // "optionsSuccessStatus": 204,
    "credentials":true
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tests api')
    .setDescription('The Tests API description')
    .setVersion('1.0')
    .addTag('tests')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalFilters(new HttpExceptionFilter());  // так можно сделать глобальный фильтр

  await app.listen(3003);
}
bootstrap();
