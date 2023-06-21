import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '@app/common';

@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@Req() req: any): string {
    console.log(req.user);
    return this.inventoryService.getHello();
  }
}
