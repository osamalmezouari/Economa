import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { CouponModule } from 'src/resources/billing/coupon/coupon.module';
import { ShoppingCartModule } from 'src/resources/settings/shopping-cart/shopping-cart.module';
import { BalanceModule } from 'src/resources/billing/balance/balance.module';
import { PaymentModule } from 'src/resources/billing/payment/payment.module';
import { OrderItemService } from './services/order-item.service';

@Module({
  imports: [
    PrismaModule,
    CouponModule,
    ShoppingCartModule,
    BalanceModule,
    PaymentModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderItemService],
  exports: [OrdersService],
})
export class OrdersModule {}
