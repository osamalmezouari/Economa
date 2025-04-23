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

export const getOrdersHistory = async (page: number, email: string) => {
  try {
    const response = await apiClient.get('orders/History', {
      params: { page, email },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to get Orders History');
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await apiClient.get(`orders/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to get Order Details');
  }
};

export const getUserOrders = async (page: number) => {
  try {
    const response = await apiClient.get('orders/user', {
      params: { page },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to get user orders');
  }
};
