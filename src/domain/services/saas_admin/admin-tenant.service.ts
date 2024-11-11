import { Injectable, Inject } from '@nestjs/common';
import { Tenant } from 'src/domain/models/saas_admin/tenant.model';
import { TenantRepository } from 'src/domain/repositories/saas_admin/tenant.repository.interface';

@Injectable()
export class AdminTenantService {
  constructor(
    @Inject('TenantRepository')
    private readonly tenant_repository: TenantRepository,
  ) {}

  async getAllTenants(): Promise<Tenant[]> {
    return this.tenant_repository.find();
  }

  async getTenantById(tenantId: string): Promise<Tenant | null> {
    return this.tenant_repository.findById(tenantId);
  }
}
