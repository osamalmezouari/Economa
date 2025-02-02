import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { PlaceOrderDto } from './dto/placeOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('placeandpay')
  async create(@Body() data: PlaceOrderDto, @activeUser('sub') userId: string) {
    const createdOrderID = await this.ordersService.PlaceAndPayOrder(
      {
        couponCode: data.couponCode,
      },
      userId,
    );
    return createdOrderID;
  }
  /* @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return order;
  }

  @Get()
  async findAll() {
    const order = await this.ordersService.findAll();
    return order;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);
    return order;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.ordersService.update(id, updateOrderDto);
    return order;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const order = await this.ordersService.remove(id);
    return order;
  } */
}
