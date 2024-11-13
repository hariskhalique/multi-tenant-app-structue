import { Customer } from 'src/domain/models/saas_tenant/customer.model';
import { CustomerEntity } from '../entities/saas_tenant/customer.entity';
import { Address } from 'src/domain/models/saas_tenant/address.model';
import { Addresses } from '../entities/saas_tenant/address.entity';

export function toCustomerModel(customerEntity: CustomerEntity): Customer {
  const addresses = customerEntity.addresses.map(
    (addressEntity) =>
      new Address(
        addressEntity.id,
        addressEntity.street,
        addressEntity.city,
        addressEntity.postalCode,
      ),
  );

  return new Customer(
    customerEntity.id,
    customerEntity.name,
    customerEntity.email,
    addresses,
  );
}

export function toCustomerEntity(customer: Customer): CustomerEntity {
  const customerEntity = new CustomerEntity();
  customerEntity.name = customer.name;
  customerEntity.email = customer.email;
  customerEntity.addresses = [];
  if (customer.addresses) {
    customerEntity.addresses = customer.addresses.map((address) => {
      const addressEntity = new Addresses();
      addressEntity.id = address.id;
      addressEntity.street = address.street;
      addressEntity.city = address.city;
      addressEntity.postalCode = address.postalCode;
      return addressEntity;
    });
  }
  return customerEntity;
}
