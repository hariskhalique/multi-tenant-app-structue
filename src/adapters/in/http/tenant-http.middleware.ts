import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantConnectionService } from '../../out/multi-tenant/tenant-connection.service';
import { TenantContextService } from 'src/adapters/common/tenant-context.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantContextService: TenantContextService,
    private readonly tenantConnectionService: TenantConnectionService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      throw new Error('Tenant ID not provided');
    }

    try {
      // Validate and establish tenant connection
      await this.tenantConnectionService.getTenantConnection(tenantId);
      this.tenantContextService.setTenantId(tenantId);
      next();
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
}
