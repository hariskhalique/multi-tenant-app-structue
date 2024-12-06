import { Tenant } from 'src/domain/models/saas_admin/tenant.model';
import { Tenants } from '../entities/saas_admin/tenant.entity';

export function toTenantModel(tenantEntity: Tenants): Tenant {
  return new Tenant(tenantEntity.tenant_name, tenantEntity.schema);
}
