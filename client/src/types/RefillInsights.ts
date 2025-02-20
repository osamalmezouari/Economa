export interface RefillStatCard {
  title: string;
  metric: number;
  increased: number;
  decreased: number;
  percentage: number;
}



export interface RefillStatsStat {
  RefillReqStatsCard: {
    data: RefillStatCard[];
    loading: boolean;
    error: string;
  };
}
