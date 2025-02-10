import { apiClient } from '../utils/apiClient';

export const getCardStats = async () => {
  try {
    const response = await apiClient.get('/analytics/store/Stats-Cards');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytics');
  }
};

export const getSalesXProfit = async (year?: number) => {
  try {
    const response = await apiClient.get(
      `/analytics/store/SalesXProfit?year=${year}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytics');
  }
};

export const getcostXProfitLastWeek = async () => {
  try {
    const response = await apiClient.get(
      `/analytics/store/CostXProfitLastWeek`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytics');
  }
};

export const getsalesXProfitCategory = async () => {
  try {
    const response = await apiClient.get(
      `/analytics/store/SalesXProfitCategory`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytics');
  }
};

export const getTopsellingProducts = async () => {
  try {
    const response = await apiClient.get(`/analytics/store/TopSellingProducts`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytic');
  }
};

export const getTopcostumers = async () => {
  try {
    const response = await apiClient.get(`/analytics/store/TopCostumers`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytic');
  }
};

export const getlowStockProducts = async ({
  page = 1,
  productName,
}: {
  page: number;
  productName?: string;
}) => {
  try {
    const response = await apiClient.get(
      `/analytics/store/lowStockProducts?page=${page}&productName=${productName}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytic');
  }
};
