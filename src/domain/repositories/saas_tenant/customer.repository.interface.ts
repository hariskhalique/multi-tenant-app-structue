import { Customer } from '../../models/saas_tenant/customer.model';

export interface CustomerRepository {
  findById(id: string): Promise<Customer | null>;
}
