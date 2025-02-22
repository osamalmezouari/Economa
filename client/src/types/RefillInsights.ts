export interface RefillStatCard {
  title: string;
  metric: number;
  increased: number;
  decreased: number;
  percentage: number;
}

export interface RefillYearlyChart {
  monthlyData: {
    month: number;
    totalRefillRequests: number;
    totalApproved: number;
    totalBalanceApproved: number;
  }[];
  yearTotal: number;
  prevYearTotal: number;
  percentageChange: string;
}

export interface RefillStatsStat {
  RefillReqStatsCard: {
    data: RefillStatCard[];
    loading: boolean;
    error: string;
  };
  RefillYearlyChart: {
    data: RefillYearlyChart;
    loading: boolean;
    error: string;
  };
}
