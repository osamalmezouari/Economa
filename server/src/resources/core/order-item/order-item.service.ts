import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { v4 as uuid } from 'uuid';
import { ORDER_ITEM_NOT_FOUND_Exception } from '../../../common/exceptions/ORDER_ITEM_NOT_FOUND.exception';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = await this.prisma.orderItem.create({
      data: { id: uuid(), ...createOrderItemDto },
    });
    return orderItem;
  }

  async findAll() {
    const orderItem = await this.prisma.orderItem.findMany();
    return orderItem;
  }

  async findOne(id: string) {
    const orderItem = await this.prisma.orderItem.findUnique({ where: { id } });
    if (!orderItem) throw new ORDER_ITEM_NOT_FOUND_Exception(id);
    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    await this.findOne(id);
    const orderItem = await this.prisma.orderItem.update({
      where: { id },
      data: updateOrderItemDto,
    });
    return orderItem;
  }

  async remove(id: string) {
    await this.findOne(id);
    const orderItem = await this.prisma.orderItem.delete({ where: { id } });
    return orderItem;
  }
}
