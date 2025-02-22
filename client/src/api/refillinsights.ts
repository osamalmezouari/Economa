import { RefillStatCard, RefillYearlyChart } from '../types/RefillInsights';
import { apiClient } from '../utils/apiClient';

export const getRefillStatsCard = async (): Promise<RefillStatCard[]> => {
  try {
    const response = await apiClient.get(
      '/analytics/RefillInsights/StatsCards'
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch RefillStats');
  }
};

export const getRefillYearlyChart = async (
  year: string = new Date().getFullYear().toString()
): Promise<RefillYearlyChart> => {
  try {
    const response = await apiClient.get(
      `/analytics/RefillInsights/YearlyChart?year=${year}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch YearlyChart');
  }
};
