import { createAsyncThunk } from '@reduxjs/toolkit';
import * as paymentsApi from '../../api/payment';

export const getPaymentTransactions = createAsyncThunk(
  '/products/addStockTransaction',
  async (data: { page: number; search: string }, { rejectWithValue }) => {
    try {
      const payment = await paymentsApi.getPaymentTransactions(
        data.search,
        data.page
      );
      return payment;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);
