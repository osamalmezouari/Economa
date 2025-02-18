import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('store/Stats-Cards')
  getCardStats() {
    return this.analyticsService.getCardStats();
  }

  @Get('store/SalesXProfit')
  getSalesxProfit(@Query('year') year: number) {
    return this.analyticsService.SalesXProfit(year);
  }

  @Get('store/CostXProfitLastWeek')
  getSalesXProfitLastWeek() {
    return this.analyticsService.CostXProfitLastWeek();
  }

  @Get('store/SalesXProfitCategory')
  getSalesXProfitCategory() {
    return this.analyticsService.getSalesProfitCategory();
  }

  @Get('store/TopSellingProducts')
  getTopSellingProducts() {
    return this.analyticsService.getTopProducts();
  }

  @Get('store/TopCostumers')
  getTopCostumers() {
    return this.analyticsService.getTopCostumers();
  }

  @Get('store/lowStockProducts')
  getLowStockProducts(
    @Query('productName') productName: string,
    @Query('page') page: number = 1,
  ) {
    return this.analyticsService.getLowStockProducts({
      productName,
      page,
    });
  }

  @Get('RefillInsights/StatsCards')
  getRefillStatsCards() {
    return this.analyticsService.getRefillStatsCards();
  }

  @Get('RefillInsights/YearlyChart')
  getYearlyRefillChart(@Query('year') year: number) {
    return this.analyticsService.getYearlyrefillReuqtestsChart(year);
  }

  @Get('RefillInsights/RefillRequestDaily')
  getRefillDaily(@Query('date') date: string) {
    return this.analyticsService.getRefillDaily(date);
  }
}
