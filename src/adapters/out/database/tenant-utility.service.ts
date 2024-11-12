import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TenantConnectionService } from '../multi-tenant/tenant-connection.service';

@Injectable()
export class TenantUtilityService {
  private dataSource: DataSource;
  constructor(
    private readonly tenantConnectionService: TenantConnectionService,
  ) {}

  private async initializeForTenant(tenant_id): Promise<void> {
    if (!tenant_id) {
      throw new Error('Tenant ID is missing in request headers');
    }
    this.dataSource =
      await this.tenantConnectionService.getTenantConnection(tenant_id);
  }

  // Dynamically set schema for tenant repositories
  async getRepository<T>(
    entity: new () => T,
    tenant_id: string,
  ): Promise<Repository<T>> {
    if (!this.dataSource) {
      await this.initializeForTenant(tenant_id);
    }
    return this.dataSource.getRepository(entity);
  }
}
