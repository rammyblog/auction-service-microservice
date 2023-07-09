import { InventoryPrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto';
import { User } from '@prisma/auth-projects';

@Injectable()
export class InventoryService {
  constructor(private prismaService: InventoryPrismaService) {}
  async getAllProducts() {
    const products = await this.prismaService.product.findMany({});
    return products;
  }

  async createProduct(dto: CreateProductDto, user: User) {
    const product = await this.prismaService.product.create({
      data: {
        price: dto.price,
        name: dto.name,
        description: dto.description,
        userId: user.id,
      },
    });
    return product;
  }
}
