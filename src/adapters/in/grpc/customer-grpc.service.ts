import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateCustomerUseCase } from 'src/application/saas-tenant-cases/create-customer.usecase';

@Controller()
export class CustomerGRPCService {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @GrpcMethod('CustomerService', 'CreateCustomer')
  async createCustomer(data: {
    name: string;
    email: string;
  }): Promise<{ id: string; name: string; email: string }> {
    const customer = await this.createCustomerUseCase.execute(
      data.name,
      data.email,
    );
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    };
  }
}
