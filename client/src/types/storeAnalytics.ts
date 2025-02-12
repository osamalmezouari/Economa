import { ApiError } from './apierror';

export interface ChartData {
  day: string;
  orders?: number;
  totalAmount?: number;
  totalProfit?: number;
}

export interface StatData {
  title: string;
  metric: number;
  increased: boolean;
  decreased: boolean;
  percentage: number;
  chart: ChartData[];
}

export interface DashboardStats {
  orderStats: StatData;
  SalesStats: StatData;
  ProfitStats: StatData;
}

export interface SalesXProfitData {
  month: number;
  profit: number;
  expense: number;
}
export interface CostXProfitlastweekData {
  day: string;
  cost: number;
  profit: number;
}

export interface SalesXProfitCategory {
  category: string;
  sales: number;
  profit: number;
}
export interface TopSellingProducts {
  productId: string;
  productName: string;
  productImage: string;
  totalSales: number;
}

export interface TopCostumers {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  avatar: string;
}

export interface StockReportFilter {
  page: number;
  productName: string;
}
export interface StockReportProductInfo {
  products: {
    id: string;
    name: string;
    unit: string;
    stock: number;
    costprice: number;
    reviews: number;
    rating: number;
    productImage: string;
    category : string
  }[];
  productPageCount: number;
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
  CostXProfitLastWeek: {
    data: CostXProfitlastweekData[];
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  SalesXProfitCategory: {
    data: SalesXProfitCategory[];
    loading: boolean;
    error: null | ApiError | undefined | unknown;
  };

  TopSellingProducts: {
    data: TopSellingProducts[];
    loading: boolean;
    error: null | ApiError | undefined | unknown;
  };
  TopCostumers: {
    data: TopCostumers[];
    loading: boolean;
    error: null | ApiError | undefined | unknown;
  };
  StockReport: {
    data: StockReportProductInfo;
    filters: {
      page: number;
      productName: string;
    };
    loading: boolean;
    error: null | ApiError | undefined | unknown;
  };
}
