import { createSlice } from '@reduxjs/toolkit';
import {
  getCardsStats,
  getCostXProfitLastWeek,
  getsalesXProfit,
} from './StoreAnalyticsThunk';
import { storeAnalyticsState } from '../../types/storeAnalytics';

const initialState: storeAnalyticsState = {
  stateCards: {
    data: {
      orderStats: {
        title: 'New Orders',
        metric: 0,
        increased: false,
        decreased: false,
        percentage: 0,
        chart: [],
      },
      SalesStats: {
        title: 'Sales',
        metric: 0,
        increased: false,
        decreased: false,
        percentage: 0,
        chart: [],
      },
      ProfitStats: {
        title: 'Profit',
        metric: 0,
        increased: false,
        decreased: false,
        percentage: 0,
        chart: [],
      },
    },

    loading: false,
    error: null,
  },
  SalesXProfit: {
    data: [],
    loading: false,
    error: null,
  },
  CostXProfitLastWeek: {
    data: [],
    loading: false,
    error: null,
  },
};

const StoreAnalyticsSlice = createSlice({
  name: 'StoreAnalyticsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCardsStats.pending, (state) => {
        (state.stateCards.loading = true), (state.stateCards.error = null);
      })
      .addCase(getCardsStats.fulfilled, (state, action) => {
        (state.stateCards.loading = false),
          (state.stateCards.data = action.payload);
      })
      .addCase(getCardsStats.rejected, (state, action) => {
        (state.stateCards.loading = false),
          (state.stateCards.error = action.payload);
      })

      .addCase(getsalesXProfit.pending, (state) => {
        (state.SalesXProfit.loading = true), (state.SalesXProfit.error = null);
      })
      .addCase(getsalesXProfit.fulfilled, (state, action) => {
        (state.SalesXProfit.loading = false),
          (state.SalesXProfit.data = action.payload);
      })
      .addCase(getsalesXProfit.rejected, (state, action) => {
        (state.SalesXProfit.loading = false),
          (state.SalesXProfit.error = action.payload);
      })

      .addCase(getCostXProfitLastWeek.pending, (state) => {
        (state.CostXProfitLastWeek.loading = true),
          (state.CostXProfitLastWeek.error = null);
      })
      .addCase(getCostXProfitLastWeek.fulfilled, (state, action) => {
        (state.CostXProfitLastWeek.loading = false),
          (state.CostXProfitLastWeek.data = action.payload);
      })
      .addCase(getCostXProfitLastWeek.rejected, (state, action) => {
        (state.CostXProfitLastWeek.loading = false),
          (state.CostXProfitLastWeek.error = action.payload);
      });
  },
});

export default StoreAnalyticsSlice;
export const StoreAnalyticsReducer = StoreAnalyticsSlice.reducer;
