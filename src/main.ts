import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './adapters/in/http/filters/http-exception.filter';
import { LoggingInterceptor } from './adapters/in/http/interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './adapters/in/http/exception-handlers/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(), new GlobalExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
  Logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
