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

export const getSalesXProfit = async (year? : number) => {
  try {
    const response = await apiClient.get(`/analytics/store/SalesXProfit?year=${year}`);
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
    const response = await apiClient.get(`/analytics/store/CostXProfitLastWeek`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch analytics');
  }
};