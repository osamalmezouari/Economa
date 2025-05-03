import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { AuthenticationType } from 'src/common/enums/authentication';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ROLES_READ)
  @Get()
  async findAll() {
    const roles = await this.roleService.findAll();
    return roles;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ROLE_READ)
  @Get('with-users')
  async findAllWithUsers() {
    const roles = await this.roleService.findAllWithUsers();
    return roles;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ROLE_READ)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.roleService.findOne(id);
    return role;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ROLE_CREATE)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.create(createRoleDto);
    return role;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ROLE_UPDATE)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.roleService.update(id, updateRoleDto);
    return role;
  }
  
  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ROLE_PERMISSIONS_UPDATE)
  @Patch(':id/permissions')
  async updateRolePermissions(
    @Param('id') id: string,
    @Body('permissionIds') permissionIds: string[],
  ) {
    const role = await this.roleService.updateRolePermissions(
      id,
      permissionIds,
    );
    return role;
  }
}
