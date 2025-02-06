import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCardStats,
  getSalesXProfit,
  getSalesXProfitLastWeek,
} from '../../api/StoreAnalytics';

export const getCardsStats = createAsyncThunk(
  'analytics/store/Stats-Cards',
  async (_, { rejectWithValue }) => {
    try {
      const CardsStats = await getCardStats();
      return CardsStats;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch card stats');
    }
  }
);

export const getsalesXProfit = createAsyncThunk(
  'analytics/store/SalesXProfit',
  async (year: number | undefined, { rejectWithValue }) => {
    try {
      const SalesXProfit = await getSalesXProfit(year);
      return SalesXProfit;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch sales profit analytics');
    }
  }
);

export const getsalesXProfitLastWeek = createAsyncThunk(
  'analytics/store/SalesXProfitLastWeek',
  async (_, { rejectWithValue }) => {
    try {
      const SalesXProfitLastWeek = await getSalesXProfitLastWeek();
      return SalesXProfitLastWeek;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch sales profit last week analytics');
    }
  }
);
