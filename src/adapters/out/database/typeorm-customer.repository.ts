import { Injectable, Scope, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomerRepository } from '../../../domain/repositories/saas_tenant/customer.repository.interface';
import { CustomerEntity } from './entities/saas_tenant/customer.entity';
import { Customer } from 'src/domain/models/saas_tenant/customer.model';
import { TenantConnectionService } from '../multi-tenant/tenant-connection.service';
import { toCustomerModel } from './mappers/saas-tenant-customer.mapper';

@Injectable({ scope: Scope.REQUEST })
export class TypeORMCustomerRepository implements CustomerRepository {
  private dataSource: DataSource;
  private customerRepository: Repository<CustomerEntity>;

  constructor(
    private readonly tenantConnectionService: TenantConnectionService,
    @Inject('REQUEST') private readonly request: any,
  ) {}

  private async initializeForTenant(): Promise<void> {
    const tenantId = this.request.tenantId;
    if (!tenantId) {
      throw new Error('Tenant ID is missing in request headers');
    }
    this.dataSource =
      await this.tenantConnectionService.getTenantConnection(tenantId);
    this.customerRepository = this.dataSource.getRepository(CustomerEntity);
  }

  async findById(id: string): Promise<Customer | null> {
    if (!this.customerRepository) {
      await this.initializeForTenant();
    }
    const customer_entity = await this.customerRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
    return customer_entity ? toCustomerModel(customer_entity) : null;
  }

  async find(): Promise<Customer[] | null> {
    if (!this.customerRepository) {
      await this.initializeForTenant();
    }

    const customers = await this.customerRepository.find({
      relations: ['addresses'],
    });

    return customers ? customers.map(toCustomerModel) : null;
  }
}
