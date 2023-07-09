import { InventoryPrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  constructor(private prismaService: InventoryPrismaService) {}
  async getAllProducts() {
    const products = await this.prismaService.product.findMany({});
    return products;
  }
}
