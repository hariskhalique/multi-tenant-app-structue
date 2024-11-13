import { Injectable } from '@nestjs/common';
import { Customer } from '../../domain/models/saas_tenant/customer.model';
import { CustomerService } from 'src/domain/services/saas_tenant/customer.service';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(name: string, email: string): Promise<Customer | null> {
    const customer = new Customer('', name, email, []);
    return await this.customerService.saveCustomer(customer);
  }
}
