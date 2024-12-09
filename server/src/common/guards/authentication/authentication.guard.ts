import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccesTokenGuard } from './acces-token.guard';
import { Reflector } from '@nestjs/core';
import { AuthenticationType } from '../../enums/authentication';
import { AUTHENTICATION_KEY } from '../../decorators/meta/authentication.decorator';
import { INVALID_TOKEN_Exception } from '../../exceptions/INVALID_TOKEN.exception';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly accessTokenGuard: AccesTokenGuard,
    private readonly reflactor: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const meta = this.reflactor.get<AuthenticationType[]>(
      AUTHENTICATION_KEY,
      context.getHandler(),
    ) || [AuthenticationType.bearer];
    console.log(meta);
    if (meta.includes(AuthenticationType.None)) {
      return true;
    }
    if (meta.includes(AuthenticationType.bearer)) {
      const isTokenValide = this.accessTokenGuard.canActivate(context);
      if (!isTokenValide) {
        throw INVALID_TOKEN_Exception;
      } else {
        return true;
      }
    }
  }
}
