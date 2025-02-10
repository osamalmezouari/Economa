import { createSlice } from '@reduxjs/toolkit';
import {
  getCardsStats,
  getCostXProfitLastWeek,
  getLowStockProducts,
  getsalesXProfit,
  getSalesXProfitCategory,
  getTopCostumers,
  getTopSellingProducts,
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
  SalesXProfitCategory: {
    data: [],
    loading: false,
    error: null,
  },
  TopCostumers: {
    data: [],
    loading: false,
    error: null,
  },
  TopSellingProducts: {
    data: [],
    loading: false,
    error: null,
  },
  StockReport: {
    data: {
      products: [],
      productPageCount: 0,
    },
    filters: {
      page: 0,
      productName: '',
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
      })

      .addCase(getSalesXProfitCategory.pending, (state) => {
        (state.SalesXProfitCategory.loading = true),
          (state.SalesXProfitCategory.error = null);
      })
      .addCase(getSalesXProfitCategory.fulfilled, (state, action) => {
        (state.SalesXProfitCategory.loading = false),
          (state.SalesXProfitCategory.data = action.payload);
      })
      .addCase(getSalesXProfitCategory.rejected, (state, action) => {
        (state.SalesXProfitCategory.loading = false),
          (state.SalesXProfitCategory.error = action.payload);
      })

      .addCase(getTopCostumers.pending, (state) => {
        (state.TopCostumers.loading = true), (state.TopCostumers.error = null);
      })
      .addCase(getTopCostumers.fulfilled, (state, action) => {
        (state.TopCostumers.loading = false),
          (state.TopCostumers.data = action.payload);
      })
      .addCase(getTopCostumers.rejected, (state, action) => {
        (state.TopCostumers.loading = false),
          (state.TopCostumers.error = action.payload);
      })

      .addCase(getTopSellingProducts.pending, (state) => {
        (state.TopSellingProducts.loading = true),
          (state.TopSellingProducts.error = null);
      })
      .addCase(getTopSellingProducts.fulfilled, (state, action) => {
        (state.TopSellingProducts.loading = false),
          (state.TopSellingProducts.data = action.payload);
      })
      .addCase(getTopSellingProducts.rejected, (state, action) => {
        (state.TopSellingProducts.loading = false),
          (state.TopSellingProducts.error = action.payload);
      })

      .addCase(getLowStockProducts.pending, (state) => {
        (state.StockReport.loading = true), (state.StockReport.error = null);
      })
      .addCase(getLowStockProducts.fulfilled, (state, action) => {
        (state.StockReport.loading = false),
          (state.StockReport.data = action.payload);
      })
      .addCase(getLowStockProducts.rejected, (state, action) => {
        (state.StockReport.loading = false),
          (state.StockReport.error = action.payload);
      });
  },
});

export default StoreAnalyticsSlice;
export const StoreAnalyticsReducer = StoreAnalyticsSlice.reducer;
