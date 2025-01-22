import { RefillBalanceRequest } from '../types/refillbalance';
import { apiClient } from '../utils/apiClient';

/* export const getbalance = async (): Promise<BalanceType[]> => {
  try {
    const response = await apiClient.get<BalanceType[]>('/balance');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to Fetch Balance');
  }
}; */

export const refillBalance = async (
  data: RefillBalanceRequest
): Promise<RefillBalanceRequest> => {
  try {
    const response = await apiClient.post<RefillBalanceRequest>(
      '/refillbalancerequest',
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to Refill Balance');
  }
};
