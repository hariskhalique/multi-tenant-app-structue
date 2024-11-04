import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantConnectionService } from '../multi-tenant/tenant-connection.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantConnectionService: TenantConnectionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      throw new Error('Tenant ID not provided');
    }

    try {
      // Validate and establish tenant connection
      await this.tenantConnectionService.getTenantConnection(tenantId);
      req['tenantId'] = tenantId;
      next();
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
}
