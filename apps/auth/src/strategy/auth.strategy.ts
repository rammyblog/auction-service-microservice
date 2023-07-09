import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthPrismaService } from '@app/common';
import { UserTransformer } from '../users/transformers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: AuthPrismaService) {
    super({
      jwtFromRequest:
        ExtractJwt.fromExtractors([
          (request: any) => {
            return this.getJwtFromAuthorization(request?.headers.auth);
          },
        ]) || ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  private getJwtFromAuthorization(authorization: string): string {
    return authorization && authorization.split(' ')[1];
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    return new UserTransformer(user);
  }
}
