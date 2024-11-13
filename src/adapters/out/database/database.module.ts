import {
  Module,
  MiddlewareConsumer,
  Global,
  RequestMethod,
} from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TenantMiddleware } from '../../in/http/tenant-http.middleware';
import { TenantConnectionService } from '../multi-tenant/tenant-connection.service';
import { TypeORMCustomerRepository } from './typeorm-repositories/typeorm-customer.repository';
import { Tenants } from './entities/saas_admin/tenant.entity';
import { TypeORMTenantRepository } from './typeorm-repositories/typeorm-tenant.repository';
import { TenantUtilityService } from './tenant-utility.service';
import { TenantContextModule } from 'src/adapters/common/common.module';

@Global()
@Module({
  imports: [TenantContextModule],
  providers: [
    {
      provide: 'SAAS_ADMIN_DATASOURCE',
      useFactory: async () => {
        const dataSourceOptions: DataSourceOptions = {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USER,
          password: String(process.env.DATABASE_PASSWORD),
          database: process.env.DATABASE_NAME,
          logging: 'all',
          schema: 'saas_admin',
          entities: [Tenants],
          migrations: [
            'dist/adapters/out/database/migrations/saas_admin/**/*.js',
          ],
        };
        const dataSource = new DataSource(dataSourceOptions);
        await dataSource.initialize();
        await dataSource.createQueryRunner().createSchema('saas_admin', true);
        await dataSource.runMigrations({ transaction: 'each' });
        return dataSource;
      },
    },
    TenantUtilityService,
    TenantConnectionService,
    {
      provide: 'CustomerRepository',
      useClass: TypeORMCustomerRepository,
    },
    {
      provide: 'TenantRepository',
      useClass: TypeORMTenantRepository,
    },
  ],
  exports: [
    'SAAS_ADMIN_DATASOURCE',
    TenantConnectionService,
    TenantUtilityService,
    'CustomerRepository',
    'TenantRepository',
  ],
})
export class DatabaseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: 'customers/*', method: RequestMethod.ALL });
  }
}
