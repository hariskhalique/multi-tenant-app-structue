import { Controller, Get, Param } from '@nestjs/common';
import { Tenant } from 'src/domain/models/saas_admin/tenant.model';
import { GetAllTenantsUserCase } from 'src/application/saas-admin-cases/get-all-tenant.usecase';
import { GetTenantByIdUserCase } from 'src/application/saas-admin-cases/get-tenant-by-id.usecase';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly getAllTenantUserCase: GetAllTenantsUserCase,
    private readonly getTenantByIdUserCase: GetTenantByIdUserCase,
  ) { }

  @Get('/tenants')
  async getAllTenants(): Promise<Tenant[]> {
    return await this.getAllTenantUserCase.execute();
  }

  @Get('tenants/:tenantId')
  async getTenantById(@Param('tenantId') tenantId: string): Promise<Tenant> { 
    return await this.getTenantByIdUserCase.execute(tenantId);
  }
}
