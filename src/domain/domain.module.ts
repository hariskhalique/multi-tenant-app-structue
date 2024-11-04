import { Module } from '@nestjs/common';
import { CustomerService } from './services/saas_tenant/customer.service';

@Module({
  providers: [CustomerService],
  exports: [CustomerService],
})
export class DomainModule {}
