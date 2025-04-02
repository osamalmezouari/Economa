import { createAsyncThunk } from '@reduxjs/toolkit';
import * as balanceApi from '../../api/balance';

export const refillBalanceRequest = createAsyncThunk(
  'balance/refillbalancerequest',
  async (data: any, { rejectWithValue }) => {
    try {
      return await balanceApi.refillBalance(data);
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong.',
      });
    }
  }
);

export const getbalanceCardInfo = createAsyncThunk(
  'balance/getbalanceCardInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await balanceApi.getbalanceCardInfo();
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong.',
      });
    }
  }
);

export const getRefillList = createAsyncThunk(
  'balance/RefillsList',
  async (page: number, { rejectWithValue }) => {
    try {
      const RefillsList = await balanceApi.getRefillsList(page);
      return RefillsList;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch RefillDaily');
    }
  }
);

export const UpdateRefillStatus = createAsyncThunk(
  'balance/refill/updateStatus',
  async (
    {
      requestId,
      status,
    }: {
      requestId: string;
      status: 'approved' | 'rejected';
    },
    { rejectWithValue }
  ) => {
    try {
      const RefillsList = await balanceApi.UpdateRefillStatus(
        status,
        requestId
      );
      return RefillsList;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch RefillDaily');
    }
  }
);

export const getRequestStatus = createAsyncThunk(
  'balance/refill/reuqestStatus',
  async (requestId: string, { rejectWithValue }) => {
    try {
      const RefillStatus = await balanceApi.getRequestStatus(requestId);
      return RefillStatus;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch RefillDaily');
    }
  }
);
