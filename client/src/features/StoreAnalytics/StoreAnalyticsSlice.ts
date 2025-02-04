import { createSlice } from '@reduxjs/toolkit';
import { getCardsStats } from './StoreAnalyticsThunk';
import { storeAnalyticsState } from '../../types/storeAnalytics';

const initialState: storeAnalyticsState = {
  statCard: {
    data: {
      orderCountStats: {
        totalOrdersMonth: 0,
        ordersData: [],
        increased: false,
        decreased: false,
        percentage: 0,
      },
      orderSalesStats: {
        totalOrdersAmountMonth: 0,
        ordersData: [],
        increased: false,
        decreased: false,
        percentage: 0,
      },
      orderProfitStats: {
        totalProfitMonth: 0,
        ordersData: [],
        increased: false,
        decreased: false,
        percentage: 0,
      },
    },
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
        (state.statCard.loading = true), (state.statCard.error = null);
      })
      .addCase(getCardsStats.fulfilled, (state, action) => {
        (state.statCard.loading = false),
          (state.statCard.data = action.payload);
      })
      .addCase(getCardsStats.rejected, (state, action) => {
        (state.statCard.loading = false),
          (state.statCard.error = action.payload);
      });
  },
});

export default StoreAnalyticsSlice;
export const StoreAnalyticsReducer = StoreAnalyticsSlice.reducer;
