import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { GetCustomerInfoUseCase } from 'src/application/saas-tenant-cases/get-customer-info.usecase';
import { Customer } from 'src/domain/models/saas_tenant/customer.model';
import { FeatureFlagInterceptor } from '../feature-flag.interceptor';
import { FeatureFlag } from '../feature-flag.decorator';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly getCustomerInfoUseCase: GetCustomerInfoUseCase,
  ) {}

  @Get(':id')
  @UseInterceptors(FeatureFlagInterceptor)
  @FeatureFlag('xxxx')
  async getCustomer(@Param('id') id: string): Promise<Customer | null> {
    return await this.getCustomerInfoUseCase.execute(id);
  }
}
