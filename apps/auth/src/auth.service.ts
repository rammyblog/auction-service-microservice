import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { LoginDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthPrismaService } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private prisma: AuthPrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      throw new BadRequestException('Invalid email/password');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '50m',
      }),
    };
  }
}
