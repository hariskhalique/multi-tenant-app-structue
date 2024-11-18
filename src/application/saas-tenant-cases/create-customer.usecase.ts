import { Injectable } from '@nestjs/common';
import { Customer } from '../../domain/models/saas_tenant/customer.model';
import { CustomerService } from 'src/domain/services/saas_tenant/customer.service';
import { CreateCustomerDto } from 'src/adapters/in/grpc/dto/create-customer.dto';
import { Address } from 'src/domain/models/saas_tenant/address.model';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(data: CreateCustomerDto): Promise<Customer | null> {
    const customer = new Customer('', data.name, data.email);
    data.addresses.map((address) => {
      const addressObj = new Address(
        '',
        address.street,
        address.city,
        address.postalCode,
      );
      customer.addAddress(addressObj);
    });
    return await this.customerService.saveCustomer(customer);
  }
}
