import { Injectable } from '@nestjs/common';
import { Customer } from '../../domain/models/saas_tenant/customer.model';
import { CustomerService } from 'src/domain/services/saas_tenant/customer.service';

@Injectable()
export class GetCustomerInfoUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(id: string): Promise<Customer | null> {
    return await this.customerService.getCustomerInfo(id);
  }
}
