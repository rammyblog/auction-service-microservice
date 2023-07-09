import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/auth-projects';

@Injectable()
export class AuthPrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(AuthPrismaService.name);
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
