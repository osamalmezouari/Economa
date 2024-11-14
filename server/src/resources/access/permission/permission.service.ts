import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { v4 as uuid } from 'uuid';
import { PERMISSION_NOT_FOUND_Exception } from 'src/common/exceptions/Permission_not_found.exception';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.prisma.permission.create({
      data: { id: uuid(), ...createPermissionDto },
    });
    return permission;
  }

  async findAll() {
    const permissions = await this.prisma.permission.findMany();
    return permissions;
  }

  async findOne(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (permission) return permission;
    throw new PERMISSION_NOT_FOUND_Exception(id);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    await this.findOne(id);
    const Permission = await this.prisma.permission.update({
      where: { id },
      data: updatePermissionDto,
    });
    return Permission;
  }

  async remove(id: string) {
    await this.findOne(id);
    const Permission = await this.prisma.permission.delete({
      where: { id },
    });
    return Permission;
  }
}
