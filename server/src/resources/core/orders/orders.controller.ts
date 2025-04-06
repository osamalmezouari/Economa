import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './services/orders.service';
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
  @Get('History')
  async getOrdersHistory(@Param('page') page: string) {
    const orders = await this.ordersService.getOrderHistory(page);
    return orders;
  }
}
