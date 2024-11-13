import { Module } from '@nestjs/common';
import { CustomerService } from 'src/domain/services/saas_tenant/customer.service';
import { GetCustomerInfoUseCase } from './saas-tenant-cases/get-customer-info.usecase';
import { GetAllTenantsUseCase } from './saas-admin-cases/get-all-tenant.usecase';
import { AdminTenantService } from 'src/domain/services/saas_admin/admin-tenant.service';
import { GetTenantByIdUseCase } from './saas-admin-cases/get-tenant-by-id.usecase';
import { CreateCustomerUseCase } from './saas-tenant-cases/create-customer.usecase';

@Module({
  providers: [
    GetCustomerInfoUseCase,
    CustomerService,
    GetAllTenantsUseCase,
    AdminTenantService,
    GetTenantByIdUseCase,
    CreateCustomerUseCase,
  ],
  exports: [
    GetCustomerInfoUseCase,
    GetAllTenantsUseCase,
    GetTenantByIdUseCase,
    CreateCustomerUseCase,
  ],
})
export class ApplicationModule {}
