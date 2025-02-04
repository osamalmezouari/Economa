import { apiClient } from '../utils/apiClient';

export const getCardStats = async () => {
  try {
    const response = await apiClient.get('/analytics/store/Stats-Cards');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed Apply Coupon');
  }
};
