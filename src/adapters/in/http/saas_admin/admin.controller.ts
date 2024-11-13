import { Controller, Get, Param } from '@nestjs/common';
import { Tenant } from 'src/domain/models/saas_admin/tenant.model';
import { GetAllTenantsUseCase } from 'src/application/saas-admin-cases/get-all-tenant.usecase';
import { GetTenantByIdUseCase } from 'src/application/saas-admin-cases/get-tenant-by-id.usecase';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly getAllTenantUserCase: GetAllTenantsUseCase,
    private readonly getTenantByIdUserCase: GetTenantByIdUseCase,
  ) {}

  @Get('/tenants')
  async getAllTenants(): Promise<Tenant[]> {
    return await this.getAllTenantUserCase.execute();
  }

  @Get('tenants/:tenantId')
  async getTenantById(@Param('tenantId') tenantId: string): Promise<Tenant> {
    return await this.getTenantByIdUserCase.execute(tenantId);
  }
}
