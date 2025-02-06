import { ApiError } from './apierror';

interface ChartData {
  day: string;
  orders?: number;
  totalAmount?: number;
  totalProfit?: number;
}

interface StatData {
  title: string;
  metric: number;
  increased: boolean;
  decreased: boolean;
  percentage: number;
  chart: ChartData[];
}

interface DashboardStats {
  orderStats: StatData;
  SalesStats: StatData;
  ProfitStats: StatData;
}

interface SalesXProfitData {
  month: number;
  profit: number;
  expense: number;
}
interface SalesXProfitlastweekData {
  day: string;
  profit: number;
  expense: number;
}

export interface storeAnalyticsState {
  stateCards: {
    data: DashboardStats;
    loading: boolean;
    error: ApiError | null | unknown | undefined;
  };
  SalesXProfit: {
    data: SalesXProfitData[];
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  SalesXProfitLastWeek: {
    data: SalesXProfitlastweekData[];
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
}
