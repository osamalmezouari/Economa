import {
  BalanceCard,
  RefillBalanceRequest,
  TransferRequest,
  Transfer,
} from '../types/balance';
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
    const response = await apiClient.get(
      `/balance/refillbalancerequest?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Refill Requests');
  }
};

export const UpdateRefillStatus = async (
  status: 'approved' | 'rejected',
  requestId: string
) => {
  try {
    const response = await apiClient.patch(
      `/balance/refillbalancerequest/UpdateStatus/${requestId}`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Refill Requests');
  }
};

export const getRequestStatus = async (requestId: string) => {
  try {
    const response = await apiClient.get(
      `/balance/refillbalancerequest/status/${requestId}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Refill Requests');
  }
};

export const getUserRefills = async (page: number) => {
  try {
    const response = await apiClient.get(
      `/balance/user/refillbalancerequest?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch User Refill Requests');
  }
};

export const makeTransfer = async (
  data: TransferRequest
): Promise<TransferRequest> => {
  try {
    const response = await apiClient.post('/balance/transfers/make', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Make Transfer');
  }
};

export const getUserTransfers = async (): Promise<Transfer[]> => {
  try {
    const response = await apiClient.get('/balance/transfers/user');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch User Transfers');
  }
};
