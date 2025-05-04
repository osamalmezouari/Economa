import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SET_PERMESSIONS } from 'src/common/decorators/meta/authorization.decorator';
import { Permissions_TYPE } from 'src/common/enums/permissions';
import { AuthenticationType } from 'src/common/enums/authentication';
import { AUTH } from 'src/common/decorators/meta/authentication.decorator';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_STORE_READ)
  @Get('store/Stats-Cards')
  getCardStats() {
    return this.analyticsService.getCardStats();
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_STORE_READ)
  @Get('store/SalesXProfit')
  getSalesxProfit(@Query('year') year: number) {
    return this.analyticsService.SalesXProfit(year);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_STORE_READ)
  @Get('store/CostXProfitLastWeek')
  getSalesXProfitLastWeek() {
    return this.analyticsService.CostXProfitLastWeek();
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_STORE_READ)
  @Get('store/SalesXProfitCategory')
  getSalesXProfitCategory() {
    return this.analyticsService.getSalesProfitCategory();
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_STORE_READ)
  @Get('store/TopSellingProducts')
  getTopSellingProducts() {
    return this.analyticsService.getTopProducts();
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_STORE_READ)
  @Get('store/TopCostumers')
  getTopCostumers() {
    return this.analyticsService.getTopCostumers();
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_STORE_READ)
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

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_REFILL_READ)
  @Get('RefillInsights/StatsCards')
  getRefillStatsCards() {
    return this.analyticsService.getRefillStatsCards();
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_REFILL_READ)
  @Get('RefillInsights/YearlyChart')
  getYearlyRefillChart(@Query('year') year: number) {
    return this.analyticsService.getYearlyrefillReuqtestsChart(year);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_REFILL_READ)
  @Get('RefillInsights/RefillRequestDaily')
  getRefillDaily(@Query('date') date: string) {
    return this.analyticsService.getRefillDaily(date);
  }

  @AUTH(AuthenticationType.bearer)
  @SET_PERMESSIONS(Permissions_TYPE.ANALYTICS_REFILL_READ)
  @Get('RefillInsights/UsersTransfers')
  getUsersTransfers() {
    return this.analyticsService.getUsersTransfers();
  }
}
