import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { activeUser } from 'src/common/decorators/params/activeUser.decorator';
import { PlaceOrderDto } from './dto/placeOrder.dto';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';
import { sub } from 'date-fns';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ORDER_CREATE)
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

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ORDER_READ)
  @Get('History')
  async getOrdersHistory(
    @Query('page') page: string,
    @Query('email') email: string,
  ) {
    const orders = await this.ordersService.getOrderHistory(
      parseInt(page),
      email,
    );
    return orders;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ORDER_READ)
  @Get('user')
  async UserOrders(
    @activeUser('sub') userId: string,
    @Query('page') page: number,
  ) {
    const orders = await this.ordersService.getOrderByUserId(userId, page);
    return orders;
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ORDER_READ)
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    const order = await this.ordersService.getOrderById(orderId);
    return order;
  }
}
