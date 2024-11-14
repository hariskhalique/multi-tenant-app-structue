import {
  Module,
  MiddlewareConsumer,
  Global,
  RequestMethod,
} from '@nestjs/common';
import { TenantMiddleware } from '../../in/http/tenant-http.middleware';
import { TypeORMCustomerRepository } from './typeorm-repositories/typeorm-customer.repository';
import { TypeORMTenantRepository } from './typeorm-repositories/typeorm-tenant.repository';
import { TenantUtilityService } from './tenant-utility.service';
import { TenantConnectionModule } from '../multi-tenant/tenant-connection.module';
import { SaasAdminDataSource } from './saas-admin.datasource';

@Global()
@Module({
  imports: [TenantConnectionModule],
  providers: [
    {
      provide: 'SAAS_ADMIN_DATASOURCE',
      useFactory: () => SaasAdminDataSource.getInstance(),
    },
    TenantUtilityService,
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
