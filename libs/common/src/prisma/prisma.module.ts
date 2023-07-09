import { Global, Module } from '@nestjs/common';
import { InventoryPrismaService } from './inventory/index.service';
import { AuthPrismaService } from './auth/index.service';

@Global()
@Module({
  providers: [AuthPrismaService, InventoryPrismaService],
  exports: [AuthPrismaService, InventoryPrismaService],
})
export class PrismaModule {}
