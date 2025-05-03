import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMESSIONS_KEY } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { UNAUTHORIZED_ACCESS_Exception } from 'src/common/exceptions/ACCESS_DENIED.exception';
import { REQUEST_USER_KEY } from 'src/common/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<Permissions_TYPE[]>(
      PERMESSIONS_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    const userDetails = await this.prisma.user.findUnique({
      where: { id: user.sub },
      include: {
        role: {
          include: {
            permissions: {
              select: {
                permission: true,
              },
            },
          },
        },
      },
    });

    const userPermissions = userDetails.role.permissions.map(
      (p) => p.permission.name,
    );

    const data = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (data) {
      return true;
    }
    if (!data) {
      throw new UNAUTHORIZED_ACCESS_Exception(userDetails.name, 'role:read');
    }
  }
}
