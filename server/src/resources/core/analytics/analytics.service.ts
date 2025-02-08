import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { sortStoreAnalyticsStatsCardsByDate } from 'src/common/utils/sortStoreAnalyticsStatsCardsByDate';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrdersService,
  ) {}

  async getCardStats() {
    const orderStats = await this.orderService.getOrdersStatsData();
    const SalesStats = await this.orderService.getOrdersSalesData();
    const profitStats = await this.orderService.getProfitSalesData();
    return {
      orderStats: {
        title: 'New Orders',
        metric: orderStats.totalOrdersMonth,
        increased: orderStats.increased,
        decreased: orderStats.decreased,
        percentage: Math.trunc(orderStats.percentage),
        chart: sortStoreAnalyticsStatsCardsByDate(orderStats.ordersData),
      },
      SalesStats: {
        title: 'Sales',
        metric: Math.trunc(SalesStats.totalOrdersAmountMonth),
        increased: SalesStats.increased,
        decreased: SalesStats.decreased,
        percentage: Math.trunc(SalesStats.percentage),
        chart: sortStoreAnalyticsStatsCardsByDate(SalesStats.ordersData),
      },
      ProfitStats: {
        title: 'Profit',
        metric: Math.trunc(profitStats.totalProfitMonth),
        increased: profitStats.increased,
        decreased: profitStats.decreased,
        percentage: Math.trunc(profitStats.percentage),
        chart: sortStoreAnalyticsStatsCardsByDate(profitStats.ordersData),
      },
    };
  }

  async SalesXProfit(year: number) {
    const data = await this.orderService.getYearlySalesXProfit(year);
    return data;
  }

  async CostXProfitLastWeek() {
    const data = await this.orderService.getLastWeekCostXProfit();
    return data;
  }

  async getSalesProfitCategory() {
    const data = await this.orderService.getSalesProfitCategoryData();
    return data;
  }

  async getTopProducts() {
    const data = await this.orderService.getTopSellingProducts();
    return data;
  }

  async getTopCostumers() {
    const data = await this.orderService.getTopCustomers();
    return data;
  }
}
