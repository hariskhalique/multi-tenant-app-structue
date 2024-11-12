import { Inject, Injectable, Scope } from '@nestjs/common';
import { Tenant } from 'src/domain/models/saas_admin/tenant.model';
import { DataSource } from 'typeorm';
import { TenantRepository } from 'src/domain/repositories/saas_admin/tenant.repository.interface';
import { Tenants } from '../entities/saas_admin/tenant.entity';
import { toTenantModel } from '../mappers/saas-admin-tennats.mapper';

@Injectable({ scope: Scope.REQUEST })
export class TypeORMTenantRepository implements TenantRepository {
  constructor(
    @Inject('SAAS_ADMIN_DATASOURCE')
    private readonly adminDataSource: DataSource,
  ) {}

  async find(): Promise<Tenant[]> {
    const tenants = await this.adminDataSource.getRepository(Tenants).find();
    return tenants.map(toTenantModel);
  }

  async findById(tenantId: string): Promise<Tenant | null> {
    const tenant = await this.adminDataSource
      .getRepository(Tenants)
      .findOneBy({ id: Number(tenantId) });
    return toTenantModel(tenant);
  }
}
