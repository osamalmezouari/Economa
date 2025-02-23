import { createSlice } from '@reduxjs/toolkit';
import { RefillStatsStat } from '../../types/RefillInsights';
import {
  getrefillDaily,
  getRefillInsightsCardsStats,
  getRefillInsightsYearlyChart,
  getusersTransfers,
} from './refillInsightsThunk';

const initialState: RefillStatsStat = {
  RefillReqStatsCard: {
    data: [],
    loading: false,
    error: '',
  },
  RefillYearlyChart: {
    data: {
      monthlyData: [],
      yearTotal: 0,
      prevYearTotal: 0,
      percentageChange: '',
    },
    loading: false,
    error: '',
  },
  RefillRequestDaily: {
    data: {
      totalRefillRequests: 0,
      totalApproved: 0,
      totalRejected: 0,
      totalPending: 0,
      data: [],
    },
    loading: false,
    error: '',
  },
  UsersTransfers: {
    data: [],
    loading: false,
    error: '',
  },
};

const RefillInsightsSlice = createSlice({
  name: 'RefillInsights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRefillInsightsCardsStats.pending, (state) => {
        state.RefillReqStatsCard.loading = true;
        state.RefillReqStatsCard.error = '';
      })
      .addCase(getRefillInsightsCardsStats.fulfilled, (state, action) => {
        state.RefillReqStatsCard.loading = false;
        state.RefillReqStatsCard.data = action.payload;
        state.RefillReqStatsCard.error = '';
      })
      .addCase(getRefillInsightsCardsStats.rejected, (state, action) => {
        state.RefillReqStatsCard.loading = false;
        state.RefillReqStatsCard.error = action.payload as string;
      })

      .addCase(getRefillInsightsYearlyChart.pending, (state) => {
        state.RefillYearlyChart.loading = true;
        state.RefillYearlyChart.error = '';
      })
      .addCase(getRefillInsightsYearlyChart.fulfilled, (state, action) => {
        state.RefillYearlyChart.loading = false;
        state.RefillYearlyChart.data = action.payload;
        state.RefillYearlyChart.error = '';
      })

      .addCase(getRefillInsightsYearlyChart.rejected, (state, action) => {
        state.RefillYearlyChart.loading = false;
        state.RefillYearlyChart.error = action.payload as string;
      })
      .addCase(getrefillDaily.pending, (state) => {
        state.RefillRequestDaily.loading = true;
        state.RefillRequestDaily.error = '';
      })
      .addCase(getrefillDaily.fulfilled, (state, action) => {
        state.RefillRequestDaily.loading = false;
        state.RefillRequestDaily.data = action.payload;
        state.RefillRequestDaily.error = '';
      })
      .addCase(getrefillDaily.rejected, (state, action) => {
        state.RefillRequestDaily.loading = false;
        state.RefillRequestDaily.error = action.payload as string;
      })

      .addCase(getusersTransfers.pending, (state) => {
        state.UsersTransfers.loading = true;
        state.UsersTransfers.error = '';
      })
      .addCase(getusersTransfers.fulfilled, (state, action) => {
        state.UsersTransfers.loading = false;
        state.UsersTransfers.data = action.payload;
        state.UsersTransfers.error = '';
      })
      .addCase(getusersTransfers.rejected, (state, action) => {
        state.UsersTransfers.loading = false;
        state.UsersTransfers.error = action.payload as string;
      });
  },
});

export default RefillInsightsSlice.reducer;
export const RefillInsightsReducer = RefillInsightsSlice.reducer;
