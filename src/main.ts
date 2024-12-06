import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';
import { GlobalExceptionFilter } from './adapters/common/global-exception.filter';
import { LoggingInterceptor } from './adapters/common/logging.interceptor';
import { HttpExceptionFilter } from './adapters/in/http/http-exception.filter';

async function bootstrap() {
  // Create a gRPC microservice
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['health', 'customer'],
        protoPath: [
          join(__dirname, 'adapters/in/grpc/proto/health.proto'),
          join(__dirname, 'adapters/in/grpc/proto/customer.proto'),
        ],
        url: 'localhost:5000',
        loader: {
          keepCase: true,
          longs: Number,
          enums: String,
          defaults: true,
          oneofs: true,
        },
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
  );

  await grpcApp.listen();
}

async function bootstrapHttpApp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter(), new GlobalExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
  Logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
bootstrapHttpApp();
