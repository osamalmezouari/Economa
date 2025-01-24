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
