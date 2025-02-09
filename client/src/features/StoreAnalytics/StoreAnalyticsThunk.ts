import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCardStats,
  getcostXProfitLastWeek,
  getSalesXProfit,
  getsalesXProfitCategory,
  getTopcostumers,
  getTopsellingProducts,
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

export const getSalesXProfitCategory = createAsyncThunk(
  'analytics/store/SalesXProfitCategory',
  async (_, { rejectWithValue }) => {
    try {
      const SalesXProfitCategory = await getsalesXProfitCategory();
      return SalesXProfitCategory;
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

export const getTopSellingProducts = createAsyncThunk(
  'analytics/store/TopsellingProducts',
  async (_, { rejectWithValue }) => {
    try {
      const TopsellingProducts = await getTopsellingProducts();
      return TopsellingProducts;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch TopsellingProducts');
    }
  }
);

export const getTopCostumers = createAsyncThunk(
  'analytics/store/TopCostumers',
  async (_, { rejectWithValue }) => {
    try {
      const Topcostumers = await getTopcostumers();
      return Topcostumers;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch Topcostumers');
    }
  }
);


