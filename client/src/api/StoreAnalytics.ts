import {
  CostXProfitlastweekData,
  DashboardStats,
  SalesXProfitCategory,
  SalesXProfitData,
  StockReportProductInfo,
  TopCostumers,
  TopSellingProducts,
} from '../types/storeAnalytics';
import { apiClient } from '../utils/apiClient';

export const getCardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await apiClient.get('/analytics/store/Stats-Cards');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch CardStats');
  }
};

export const getSalesXProfit = async (
  year?: number
): Promise<SalesXProfitData[]> => {
  try {
    const response = await apiClient.get(
      `/analytics/store/SalesXProfit?year=${year}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch SalesXProfit');
  }
};

export const getcostXProfitLastWeek = async (): Promise<
  CostXProfitlastweekData[]
> => {
  try {
    const response = await apiClient.get(
      `/analytics/store/CostXProfitLastWeek`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch costXProfitLastWeek ');
  }
};

export const getsalesXProfitCategory = async (): Promise<
  SalesXProfitCategory[]
> => {
  try {
    const response = await apiClient.get(
      `/analytics/store/SalesXProfitCategory`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch salesXProfitCategory');
  }
};

export const getTopsellingProducts = async (): Promise<
  TopSellingProducts[]
> => {
  try {
    const response = await apiClient.get(`/analytics/store/TopSellingProducts`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch TopsellingProducts');
  }
};

export const getTopcostumers = async (): Promise<TopCostumers> => {
  try {
    const response = await apiClient.get(`/analytics/store/TopCostumers`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch Topcostumers');
  }
};

export const getlowStockProducts = async ({
  page = 1,
  productName,
}: {
  page: number;
  productName?: string;
}): Promise<StockReportProductInfo> => {
  try {
    const response = await apiClient.get(
      `/analytics/store/lowStockProducts?page=${page}&productName=${productName}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch lowStockProducts');
  }
};
