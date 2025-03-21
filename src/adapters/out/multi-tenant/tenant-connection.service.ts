import { Injectable, Scope } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tenants } from '../database/entities/saas_admin/tenant.entity';
import { CustomerEntity } from '../database/entities/saas_tenant/customer.entity';
import { Addresses } from '../database/entities/saas_tenant/address.entity';
import { SaasAdminDataSource } from '../database/saas-admin.datasource';

@Injectable({ scope: Scope.REQUEST })
export class TenantConnectionService {
  private connections: { [key: string]: DataSource } = {};
  private adminDataSource: DataSource;

  constructor() {
    this.adminDataSource = SaasAdminDataSource.getInstance();
  }

  // Use saas_admin DataSource to fetch tenant schema info
  private async getTenantSchema(tenantId: string): Promise<string> {
    const tenantRepository = this.adminDataSource.getRepository(Tenants);
    const tenant = await tenantRepository.findOneBy({ id: Number(tenantId) });

    if (!tenant) {
      throw new Error(`Tenant with ID ${tenantId} not found`);
    }

    return tenant.schema; // Returns the schema associated with the tenant
  }

  async getTenantConnection(tenantId: string): Promise<DataSource> {
    const connection_name = `${process.env.COMPANY_DATABASE_PREFIX}_${tenantId}`;
    // check if connection already exists, return connection
    if (this.connections[connection_name]) {
      return this.connections[connection_name];
    }

    const tenantSchema = await this.getTenantSchema(tenantId);
    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      logging: 'all',
      schema: tenantSchema,
      entities: [CustomerEntity, Addresses],
      migrations: ['dist/adapters/out/database/migrations/saas_tenant/**/*.js'],
      extra: {
        max: 10,
        idleTimeoutMillis: 30000,
      },
    };

    const dataSource = new DataSource(dataSourceOptions);
    await dataSource.initialize();
    await dataSource.createQueryRunner().createSchema(`${tenantSchema}`, true);
    await dataSource.runMigrations({ transaction: 'each' });

    this.connections[connection_name] = dataSource;
    return dataSource;
  }
}
