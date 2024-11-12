import { MigrationInterface, QueryRunner } from 'typeorm';
import { CustomerEntity } from '../../../entities/saas_tenant/customer.entity';
import { Addresses } from '../../../entities/saas_tenant/address.entity';
const customers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      postalCode: '60601',
    },
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    address: {
      street: '456 Broadway',
      city: 'Los Angeles',
      postalCode: '90001',
    },
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001',
    },
  },
];

export class SeedCustomerAddress1731157923000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const customer of customers) {
      const customer_entity_object = new CustomerEntity();
      customer_entity_object.email = customer.email;
      customer_entity_object.name = customer.name;

      const address = new Addresses();
      address.city = customer.address.city;
      address.postalCode = customer.address.postalCode;
      address.street = customer.address.street;

      customer_entity_object.addresses = [address];

      queryRunner.connection
        .getRepository(CustomerEntity)
        .save(customer_entity_object);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.connection.getRepository(CustomerEntity).clear();
    queryRunner.connection.getRepository(Addresses).clear();
  }
}
