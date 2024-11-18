import { Injectable } from '@nestjs/common';
import { Customer } from 'src/domain/models/saas_tenant/customer.model';
import { CustomerService } from 'src/domain/services/saas_tenant/customer.service';

@Injectable()
export class GetAllCustomersUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(): Promise<Customer[] | null> {
    return await this.customerService.getCustomers();
  }
}
