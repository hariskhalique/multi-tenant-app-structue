import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateCustomerUseCase } from 'src/application/saas-tenant-cases/create-customer.usecase';
import { GetAllCustomersUseCase } from 'src/application/saas-tenant-cases/get-all-customers.usecase';
import { Customer } from 'src/domain/models/saas_tenant/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller()
export class CustomerGRPCService {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerUseCase: GetAllCustomersUseCase,
  ) {}

  @GrpcMethod('CustomerService', 'CreateCustomer')
  async createCustomer(data: CreateCustomerDto): Promise<Customer> {
    const customer = await this.createCustomerUseCase.execute(data);
    return customer;
  }

  @GrpcMethod('CustomerService', 'Customers')
  async customers(): Promise<{ customers: Customer[] | [] }> {
    const customers = await this.getCustomerUseCase.execute();
    return { customers: customers };
  }
}
