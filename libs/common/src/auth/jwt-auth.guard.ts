import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, tap } from 'rxjs';
import { AUTH_SERVICE } from './services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    const auth = `Bearer ${authentication}`;
    return this.authClient
      .send('validate_user', {
        headers: { auth },
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError((err) => {
          console.log(err);
          throw new UnauthorizedException();
        }),
      );
  }
  private getJwtFromAuthorization(authorization: string): string {
    return authorization && authorization.split(' ')[1];
  }
  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = this.getJwtFromAuthorization(
        context.switchToRpc().getData().headers.authorization,
      );
    } else if (context.getType() === 'http') {
      authentication = this.getJwtFromAuthorization(
        context.switchToHttp().getRequest().headers.authorization,
      );
    }
    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
