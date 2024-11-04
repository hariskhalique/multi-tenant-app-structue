import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tenants } from '../../../adapters/out/database/entities/saas_admin/tenant.entity';
import { Tenant } from 'src/domain/models/saas_admin/tenant.model';

@Injectable()
export class AdminTenantService {
  constructor(@Inject('SAAS_ADMIN_DATASOURCE') private readonly adminDataSource: DataSource) {}

  async getAllTenants(): Promise<Tenant[]> {
    const tenants = await this.adminDataSource.getRepository(Tenants).find();
    return tenants.map(entity => new Tenant(entity.tenant_name));
  }

  async getTenantById(tenantId: string): Promise<Tenant | null> {
    const tenant = await this.adminDataSource.getRepository(Tenants).findOneBy({ id: Number(tenantId) });
    return new Tenant(tenant.tenant_name);
  }
}
