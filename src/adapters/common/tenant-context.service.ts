import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantContextService {
  private _tenantId: string;

  setTenantId(tenantId: string) {
    this._tenantId = tenantId;
  }

  getTenantId(): string {
    if (!this._tenantId) {
      throw new Error('Tenant ID is not set');
    }
    return this._tenantId;
  }
}
