import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCardStats,
  getcostXProfitLastWeek,
  getSalesXProfit,
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

export const getCostXProfitLastWeek = createAsyncThunk(
  'analytics/store/CostXProfitLastWeek',
  async (_, { rejectWithValue }) => {
    try {
      const CostXProfitLastWeek = await getcostXProfitLastWeek();
      return CostXProfitLastWeek;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(
        'Failed to fetch sales profit last week analytics'
      );
    }
  }
);
