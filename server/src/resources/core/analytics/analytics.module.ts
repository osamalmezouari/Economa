import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { OrdersModule } from '../orders/orders.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [OrdersModule, PrismaModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
