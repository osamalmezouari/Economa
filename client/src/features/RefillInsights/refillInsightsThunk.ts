import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRefillStatsCard } from "../../api/refillinsights";

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