import { Module } from '@nestjs/common';
import { CustomerService } from './services/saas_tenant/customer.service';
import { AdminTenantService } from './services/saas_admin/admin-tenant.service';
import { FeatureFlagService } from './services/saas_admin/feature-flag.service';

@Module({
  providers: [AdminTenantService, CustomerService, FeatureFlagService],
  exports: [AdminTenantService, CustomerService, FeatureFlagService],
})
export class DomainModule {}
