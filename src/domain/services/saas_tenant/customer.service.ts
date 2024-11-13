import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../repositories/saas_tenant/customer.repository.interface';
import { Customer } from '../../models/saas_tenant/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async getCustomerInfo(id: string): Promise<Customer | null> {
    return await this.customerRepository.findById(id);
  }

  async saveCustomer(customer_data: Customer): Promise<Customer | null> {
    return await this.customerRepository.save(customer_data);
  }
}
