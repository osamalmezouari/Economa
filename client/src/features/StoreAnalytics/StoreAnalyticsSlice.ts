import { createSlice } from '@reduxjs/toolkit';
import {
  getCardsStats,
  getsalesXProfit,
  getsalesXProfitLastWeek,
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
  SalesXProfitLastWeek: {
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

      .addCase(getsalesXProfitLastWeek.pending, (state) => {
        (state.SalesXProfitLastWeek.loading = true),
          (state.SalesXProfitLastWeek.error = null);
      })
      .addCase(getsalesXProfitLastWeek.fulfilled, (state, action) => {
        (state.SalesXProfitLastWeek.loading = false),
          (state.SalesXProfitLastWeek.data = action.payload);
      })
      .addCase(getsalesXProfitLastWeek.rejected, (state, action) => {
        (state.SalesXProfitLastWeek.loading = false),
          (state.SalesXProfitLastWeek.error = action.payload);
      });
  },
});

export default StoreAnalyticsSlice;
export const StoreAnalyticsReducer = StoreAnalyticsSlice.reducer;
