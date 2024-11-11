import { Tenant } from 'src/domain/models/saas_admin/tenant.model';

export interface TenantRepository {
  findById(id: string): Promise<Tenant | null>;
  find(): Promise<Tenant[] | null>;
}
