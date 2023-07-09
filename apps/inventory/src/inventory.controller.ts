import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '@app/common';
import { CreateProductDto } from './dto';
import { User } from '@prisma/auth-projects';

@Controller('products')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAllProducts() {
    return this.inventoryService.getAllProducts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() dto: CreateProductDto, @Req() req: any) {
    const user: User = req.user;
    return this.inventoryService.createProduct(dto, user);
  }
}
