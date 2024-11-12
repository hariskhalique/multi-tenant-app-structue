import { Injectable, Scope, Inject } from '@nestjs/common';
import { CustomerRepository } from '../../../../domain/repositories/saas_tenant/customer.repository.interface';
import { CustomerEntity } from '../entities/saas_tenant/customer.entity';
import { Customer } from 'src/domain/models/saas_tenant/customer.model';
import { toCustomerModel } from '../mappers/saas-tenant-customer.mapper';
import { TenantUtilityService } from '../tenant-utility.service';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class TypeORMCustomerRepository implements CustomerRepository {
  private customRepository: Repository<CustomerEntity>;
  constructor(
    private readonly tenantUtilityService: TenantUtilityService,
    @Inject('REQUEST') private readonly request: any,
  ) {}

  private async initializeRepository() {
    this.customRepository = await this.tenantUtilityService.getRepository(
      CustomerEntity,
      this.request.tenantId,
    );
  }
  async findById(id: string): Promise<Customer | null> {
    if (!this.customRepository) await this.initializeRepository();
    const customer_entity = await this.customRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    return customer_entity ? toCustomerModel(customer_entity) : null;
  }

  async find(): Promise<Customer[] | null> {
    if (!this.customRepository) this.initializeRepository();
    const customers = await this.customRepository.find({
      relations: ['addresses'],
    });

    return customers ? customers.map(toCustomerModel) : null;
  }
}
