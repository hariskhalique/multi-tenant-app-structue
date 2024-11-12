import { Controller, Get, Param } from '@nestjs/common';
import { GetCustomerInfoUseCase } from 'src/application/saas-tenant-cases/get-customer-info.usecase';
import { Customer } from 'src/domain/models/saas_tenant/customer.model';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly getCustomerInfoUseCase: GetCustomerInfoUseCase,
  ) {}

  @Get(':id')
  async getCustomer(@Param('id') id: string): Promise<Customer | null> {
    return await this.getCustomerInfoUseCase.execute(id);
  }
}
