import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { v4 as uuid } from 'uuid';
import { ROLE_NOT_FOUND_Exception } from 'src/common/exceptions/Role_not_found.exception';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const roles = await this.prisma.role.findMany();
    return roles;
  }
  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
    if (!role) throw new ROLE_NOT_FOUND_Exception(id);

    return {
      ...role,
      permissions: role.permissions.map((rp) => rp.permission),
    };
  }

  async findAllWithUsers() {
    const roles = await this.prisma.role.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      userTotal: role.users.length,
      usersAvatars: role.users.map((user) => user.avatar),
      rolelvl: role.rolelvl,
    }));
  }

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: { id: uuid(), ...createRoleDto },
    });
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);
    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
    return updatedRole;
  }

  async updateRolePermissions(roleId: string, permissionIds: string[]) {
    await this.findOne(roleId);

    await this.prisma.rolePermission.deleteMany({
      where: { roleId },
    });

    await this.prisma.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
    });

    return this.findOne(roleId);
  }
}
