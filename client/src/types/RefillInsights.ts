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

export interface subRefillRequestdaily {
  fullname: string;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  avatar : string
}

export interface RefillRequestDaily {
  totalRefillRequests: number;
  totalApproved: number;
  totalRejected: number;
  totalPending: number;
  data: subRefillRequestdaily[];
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
  RefillRequestDaily: {
    data: RefillRequestDaily;
    loading: boolean;
    error: string;
  };
}
