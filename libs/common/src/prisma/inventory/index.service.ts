import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/inventory-projects';

@Injectable()
export class InventoryPrismaService
  extends PrismaClient
  implements OnModuleInit
{
  private logger = new Logger(InventoryPrismaService.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Db is connected');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
