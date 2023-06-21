import { JwtAuthGuard } from '@app/common';
import { Injectable, Req, UseGuards } from '@nestjs/common';

@Injectable()
export class InventoryService {
  getHello(): string {
    return 'Hello World!';
  }
}
