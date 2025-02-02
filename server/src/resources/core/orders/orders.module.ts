import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { CouponModule } from 'src/resources/billing/coupon/coupon.module';
import { ShoppingCartModule } from 'src/resources/settings/shopping-cart/shopping-cart.module';
import { BalanceModule } from 'src/resources/billing/balance/balance.module';
import { PaymentModule } from 'src/resources/billing/payment/payment.module';

@Module({
  imports: [PrismaModule, CouponModule, ShoppingCartModule , BalanceModule , PaymentModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
