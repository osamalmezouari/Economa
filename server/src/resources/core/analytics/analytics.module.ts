import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { OrdersModule } from '../orders/orders.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductModule } from '../product/product.module';
import { BalanceModule } from 'src/resources/billing/balance/balance.module';

@Module({
  imports: [OrdersModule, PrismaModule, ProductModule, BalanceModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
