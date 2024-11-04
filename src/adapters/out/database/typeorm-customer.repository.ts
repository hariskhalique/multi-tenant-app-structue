import { Injectable, Scope, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CustomerRepository } from '../../../domain/repositories/saas_tenant/customer.repository.interface';
import { Customer } from '../../../domain/models/saas_tenant/customer.model';
import { TenantConnectionService } from '../multi-tenant/tenant-connection.service';

@Injectable({ scope: Scope.REQUEST })
export class TypeORMCustomerRepository implements CustomerRepository {
  private dataSource: DataSource;

  constructor(
    private readonly tenantConnectionService: TenantConnectionService,
    @Inject('REQUEST') private readonly request: any,
  ) {}

  async onModuleInit() {
    const tenantId = this.request.tenantId;
    this.dataSource = await this.tenantConnectionService.getTenantConnection(tenantId);
  }

  async findById(id: string): Promise<Customer | null> {
    return await this.dataSource.getRepository(Customer).findOneBy({ id });
  }
}
