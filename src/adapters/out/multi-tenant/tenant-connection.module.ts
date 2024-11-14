import { Module, forwardRef } from '@nestjs/common';
import { TenantConnectionService } from './tenant-connection.service';
import { TenantContextModule } from 'src/adapters/common/tenant-context.module';

@Module({
  imports: [
    forwardRef(() => TenantContextModule), // Use forwardRef if TenantConnectionService depends on TenantContextService
  ],
  providers: [TenantConnectionService],
  exports: [TenantConnectionService],
})
export class TenantConnectionModule {}
