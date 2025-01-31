import { verfy_coupon_type } from '../types/coupon';
import { apiClient } from '../utils/apiClient';

export const verfy_coupon = async (data: verfy_coupon_type) => {
  try {
    const response = await apiClient.post('/coupon/verify', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed Apply Coupon');
  }
};
