import { Injectable, Inject } from '@nestjs/common';
import { CustomerRepository } from '../../../../domain/repositories/saas_tenant/customer.repository.interface';
import { CustomerEntity } from '../entities/saas_tenant/customer.entity';
import { Customer } from 'src/domain/models/saas_tenant/customer.model';
import {
  toCustomerEntity,
  toCustomerModel,
} from '../mappers/saas-tenant-customer.mapper';
import { TenantUtilityService } from '../tenant-utility.service';
import { Repository } from 'typeorm';
import { TenantContextService } from 'src/adapters/common/tenant-context.service';

@Injectable()
export class TypeORMCustomerRepository implements CustomerRepository {
  private customRepository: Repository<CustomerEntity>;
  constructor(
    private readonly tenantUtilityService: TenantUtilityService,
    @Inject('REQUEST') private readonly request: Request,
    private readonly tenantContext: TenantContextService,
  ) {}

  private async initializeRepository() {
    this.customRepository = await this.tenantUtilityService.getRepository(
      CustomerEntity,
      this.tenantContext.getTenantId(),
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

  async save(customer: Customer): Promise<Customer | null> {
    if (!this.customRepository) await this.initializeRepository();
    const customerEntity = toCustomerEntity(customer);
    console.log(customerEntity);
    await this.customRepository.save(customerEntity);
    return customer;
  }
}
