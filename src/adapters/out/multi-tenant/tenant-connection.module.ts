import { Module } from '@nestjs/common';
import { TenantConnectionService } from './tenant-connection.service';
import { TenantContextModule } from 'src/adapters/common/tenant-context.module';

@Module({
  imports: [TenantContextModule],
  providers: [TenantConnectionService],
  exports: [TenantConnectionService],
})
export class TenantConnectionModule {}
