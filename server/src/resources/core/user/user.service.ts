import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { USER_NOT_FOUND_Exception } from 'src/common/exceptions/User_not_found.exception';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: { id: uuid(), ...createUserDto },
    });
    return user;
  }

  async findAll() {
    const user = await this.prisma.user.findMany();
    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) return user;
    if (!user) throw new USER_NOT_FOUND_Exception(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.findOne(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
