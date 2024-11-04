import { Module } from '@nestjs/common';
import { CustomerService } from 'src/domain/services/saas_tenant/customer.service';
import { GetCustomerInfoUseCase } from './saas-tenant-cases/get-customer-info.usecase';
import { GetAllTenantsUserCase } from './saas-admin-cases/get-all-tenant.usecase';
import { AdminTenantService } from 'src/domain/services/saas_admin/admin-tenant.service';
import { GetTenantByIdUserCase } from './saas-admin-cases/get-tenant-by-id.usecase';

@Module({
  providers: [
    GetCustomerInfoUseCase,
    CustomerService,
    GetAllTenantsUserCase,
    AdminTenantService,
    GetTenantByIdUserCase],
  exports: [GetCustomerInfoUseCase, GetAllTenantsUserCase, GetTenantByIdUserCase],
})
export class ApplicationModule {}
