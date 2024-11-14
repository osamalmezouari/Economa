import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { v4 as uuid } from 'uuid';
import { ROLE_NOT_FOUND_Exception } from 'src/common/exceptions/Role_not_found.exception';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: { id: uuid(), ...createRoleDto },
    });
    return role;
  }

  async findAll() {
    const roles = await this.prisma.role.findMany();
    return roles;
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (role) return role;
    throw new ROLE_NOT_FOUND_Exception(id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);
    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
    return updatedRole;
  }

  async remove(id: string) {
    await this.findOne(id);
    const deletedRole = await this.prisma.role.delete({ where: { id } });
    return deletedRole;
  }
}
