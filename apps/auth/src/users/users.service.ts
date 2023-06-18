import { PrismaService } from '@app/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UserTransformer } from './transformers';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(dto: CreateUserDto): Promise<UserTransformer> {
    const { email, password, name } = dto;
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    }
    const hash = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });
    // return saved user
    return new UserTransformer(user);
  }
}
