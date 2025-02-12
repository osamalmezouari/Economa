import { place_and_pay_order as place_and_pay_order_type } from '../types/order';
import { apiClient } from '../utils/apiClient';

export const place_and_pay_order = async (data: place_and_pay_order_type) => {
  try {
    const response = await apiClient.post('orders/placeandpay', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to place and Pay the Order');
  }
};
