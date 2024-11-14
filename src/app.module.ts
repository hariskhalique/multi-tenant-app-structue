import { Module } from '@nestjs/common';
import { DatabaseModule } from './adapters/out/database/database.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { CustomerController } from './adapters/in/http/saas_tenant/customer.controller';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './adapters/in/http/saas_admin/admin.controller';
import { CustomerGRPCService } from './adapters/in/grpc/customer-grpc.service';
import { HealthService } from './adapters/in/grpc/health-grpc.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TenantGrpcInterceptor } from './adapters/in/grpc/tenant-grpc.interceptor';
import { TenantContextModule } from './adapters/common/tenant-context.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ApplicationModule,
    DomainModule,
    TenantContextModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantGrpcInterceptor,
    },
  ],
  controllers: [
    CustomerController,
    AdminController,
    HealthService,
    CustomerGRPCService,
  ],
})
export class AppModule {}
