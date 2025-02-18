import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersService } from '../orders/services/orders.service';
import { sortStoreAnalyticsStatsCardsByDate } from 'src/common/utils/sortStoreAnalyticsStatsCardsByDate';
import { ProductStockService } from '../product/services/product-stock.service';
import { BalanceService } from 'src/resources/billing/balance/services/balance.service';
import { RefillBalanceService } from 'src/resources/billing/balance/services/refillbalance.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrdersService,
    private readonly productstockService: ProductStockService,
    private readonly balanceService: BalanceService,
    private readonly refillBalanceService: RefillBalanceService,
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

  async getLowStockProducts({
    productName,
    page,
  }: {
    productName?: string;
    page: number;
  }) {
    const data = await this.productstockService.getLowStockProducts({
      productName: productName,
      page: page,
    });
    return data;
  }

  async getRefillStatsCards() {
    const totalRefillbalanceRequests =
      await this.refillBalanceService.TotalRefillBalanceRequestsStatCard();
    const TotalPendingRefillBalanceRequests =
      await this.refillBalanceService.TotalPendingRefillBalanceRequestsStatCard();
    const TotalApprovedRefillBalanceRequests =
      await this.refillBalanceService.TotalApprovedRefillBalanceRequestsStatCard();

    const TotalRejectedRefillBalanceRequests =
      await this.refillBalanceService.TotalRejectedRefillBalanceRequestsStatCard();

    return {
      totalRefillbalanceRequests,
      TotalPendingRefillBalanceRequests,
      TotalApprovedRefillBalanceRequests,
      TotalRejectedRefillBalanceRequests,
    };
  }

  async getYearlyrefillReuqtestsChart(year: number) {
    return await this.refillBalanceService.YearlyrefillReuqtestsChart(year);
  }

  async getRefillDaily(Date: string) {
    return await this.refillBalanceService.refillRequestDaily(Date);
  }
  
}
