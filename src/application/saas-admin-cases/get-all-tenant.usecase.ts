import { Injectable } from '@nestjs/common';
import { Tenant } from 'src/domain/models/saas_admin/tenant.model';
import { AdminTenantService } from 'src/domain/services/saas_admin/admin-tenant.service';

@Injectable()
export class GetAllTenantsUseCase {
  constructor(private readonly adminTenantService: AdminTenantService) {}

  async execute(): Promise<Tenant[]> {
    return await this.adminTenantService.getAllTenants();
  }
}
