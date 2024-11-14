import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { TenantContextService } from 'src/adapters/common/tenant-context.service';
import { TenantConnectionService } from 'src/adapters/out/multi-tenant/tenant-connection.service';

@Injectable()
export class TenantGrpcInterceptor<T> implements NestInterceptor {
  private tenantConnectionService: TenantConnectionService;
  constructor(private readonly tenantContext: TenantContextService) {
    this.tenantConnectionService = new TenantConnectionService();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    if (context.getType() === 'rpc') {
      const metadata = context.getArgByIndex(1); // Metadata is typically the second argument in gRPC

      if (metadata && metadata.get) {
        const tenantId = metadata.get('x-tenant-id')?.[0] as string;

        if (!tenantId) {
          throw new RpcException('Tenant ID is required');
        }
        this.tenantConnectionService.getTenantConnection(tenantId);
        this.tenantContext.setTenantId(tenantId);
      } else {
        throw new RpcException('Metadata is missing in the gRPC request');
      }
    }
    return next.handle();
  }
}
