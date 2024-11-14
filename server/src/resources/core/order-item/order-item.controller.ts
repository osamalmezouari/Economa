import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    const orderItem = await this.orderItemService.create(createOrderItemDto);
    return orderItem;
  }

  @Get()
  async findAll() {
    const orderItem = await this.orderItemService.findAll();
    return orderItem;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orderItem = await this.orderItemService.findOne(id);
    return orderItem;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    const orderItem = await this.orderItemService.update(
      id,
      updateOrderItemDto,
    );
    return orderItem;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const orderItem = await this.orderItemService.remove(id);
    return orderItem;
  }
}
