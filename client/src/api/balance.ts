import { BalanceCard, RefillBalanceRequest } from '../types/balance';
import { apiClient } from '../utils/apiClient';

export const refillBalance = async (
  data: RefillBalanceRequest
): Promise<RefillBalanceRequest> => {
  try {
    const response = await apiClient.post(
      '/balance/refillbalancerequest',
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Refill Balance');
  }
};

export const getbalanceCardInfo = async (): Promise<BalanceCard> => {
  try {
    const response = await apiClient.get<BalanceCard>('/balance/CardInfo');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Balance');
  }
};

export const getRefillsList = async (page: number) => {
  try {
    const response = await apiClient.get(`/balance/refillbalancerequest?page=${page}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Refill Requests');
  }
};


