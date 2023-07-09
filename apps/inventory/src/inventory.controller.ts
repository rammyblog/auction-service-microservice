import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '@app/common';

@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAllProducts() {
    // console.log(req.user);
    return this.inventoryService.getAllProducts();
  }
}
