import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRefillDaily,
  getRefillStatsCard,
  getRefillYearlyChart,
} from '../../api/refillinsights';

export const getRefillInsightsCardsStats = createAsyncThunk(
  'analytics/RefillInsights/StatsCards',
  async (_, { rejectWithValue }) => {
    try {
      const CardsStats = await getRefillStatsCard();
      return CardsStats;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch refill stats');
    }
  }
);

export const getRefillInsightsYearlyChart = createAsyncThunk(
  'analytics/RefillInsights/YearlyChart',
  async (year: string, { rejectWithValue }) => {
    try {
      const YearlyChart = await getRefillYearlyChart(year);
      return YearlyChart;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch refill chart');
    }
  }
);

export const getrefillDaily = createAsyncThunk(
  'analytics/RefillInsights/RefillRequestDaily',
  async (date: string, { rejectWithValue }) => {
    try {
      const dailyData = await getRefillDaily(date);
      return dailyData;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Failed to fetch RefillDaily');
    }
  }
);
