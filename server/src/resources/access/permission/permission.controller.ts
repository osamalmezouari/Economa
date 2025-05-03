import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.PERMISSIONS_READ)
  @Get()
  async findAll() {
    const permissions = await this.permissionService.findAll();
    return permissions;
  }
}
