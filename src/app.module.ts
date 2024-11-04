import { Module } from '@nestjs/common';
import { DatabaseModule } from './adapters/out/database/database.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { CustomerController } from './adapters/in/http/saas_tenant/customer.controller';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './adapters/in/http/saas_admin/admin.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ApplicationModule, DomainModule],
  controllers: [CustomerController, AdminController],
})
export class AppModule {}
