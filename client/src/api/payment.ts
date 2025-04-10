import { apiClient } from '../utils/apiClient';

export const getPaymentTransactions = async (search: string, page: number) => {
  try {
    const response = await apiClient.get(
      `/payment/transactions?page=${page}&search=${search}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Refill Requests');
  }
};
