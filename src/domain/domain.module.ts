import { Module } from '@nestjs/common';
import { CustomerService } from './services/saas_tenant/customer.service';
import { AdminTenantService } from './services/saas_admin/admin-tenant.service';

@Module({
  providers: [AdminTenantService, CustomerService],
  exports: [AdminTenantService, CustomerService],
})
export class DomainModule {}
