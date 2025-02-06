import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('store/Stats-Cards')
  async getCardStats() {
    return this.analyticsService.getCardStats();
  }

  @Get('store/SalesXProfit')
  async getSalesxProfit(@Query('year') year: number) {
    return this.analyticsService.SalesXProfit(year);
  }

  @Get('store/CostXProfitLastWeek')
  async getSalesXProfitLastWeek() {
    return this.analyticsService.CostXProfitLastWeek();
  }
}
