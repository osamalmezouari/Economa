import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { ORDER_NOT_FOUND_Exception } from 'src/common/exceptions/ORDER_NOT_FOUND.exception';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: { id: uuid(), ...createOrderDto },
    });
    return order;
  }

  async findAll() {
    const order = await this.prisma.order.findMany();
    return order;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (order) return order;
    throw new ORDER_NOT_FOUND_Exception(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    const order = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
    return order;
  }

  async remove(id: string) {
    await this.findOne(id);
    const order = await this.prisma.order.delete({ where: { id } });
    return order;
  }
}
