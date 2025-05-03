import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccesTokenGuard } from './acces-token.guard';
import { Reflector } from '@nestjs/core';
import { AuthenticationType } from '../../enums/authentication';
import { AUTHENTICATION_KEY } from '../../decorators/meta/authentication.decorator';
import { INVALID_TOKEN_Exception } from '../../exceptions/INVALID_TOKEN.exception';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { PERMESSIONS_KEY } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly accessTokenGuard: AccesTokenGuard,
    private readonly authorizationGuard: AuthorizationGuard,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const meta = this.reflector.get<AuthenticationType[]>(
      AUTHENTICATION_KEY,
      context.getHandler(),
    ) || [AuthenticationType.bearer];

    if (meta.includes(AuthenticationType.None)) {
      return true;
    }

    if (meta.includes(AuthenticationType.bearer)) {
      try {
        const isTokenValid = await this.accessTokenGuard.canActivate(context);
        if (!isTokenValid) {
          throw INVALID_TOKEN_Exception;
        }
        const requiredPermissions = this.reflector.get<Permissions_TYPE[]>(
          PERMESSIONS_KEY,
          context.getHandler(),
        );
        if (!requiredPermissions) {
          return true;
        }
        return await this.authorizationGuard.canActivate(context);
      } catch (error) {
        throw error;
      }
    }
  }
}
