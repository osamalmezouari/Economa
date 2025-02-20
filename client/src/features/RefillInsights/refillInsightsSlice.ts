import { createSlice } from '@reduxjs/toolkit';
import { RefillStatsStat } from '../../types/RefillInsights';
import { getRefillInsightsCardsStats } from './refillInsightsThunk';

const initialState: RefillStatsStat = {
  RefillReqStatsCard: {
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
    builder.addCase(getRefillInsightsCardsStats.pending, (state) => {
      state.RefillReqStatsCard.loading = true;
      state.RefillReqStatsCard.error = '';
    }),
      builder.addCase(
        getRefillInsightsCardsStats.fulfilled,
        (state, action) => {
          state.RefillReqStatsCard.loading = false;
          state.RefillReqStatsCard.data = action.payload;
          state.RefillReqStatsCard.error = '';
        }
      ),
      builder.addCase(getRefillInsightsCardsStats.rejected, (state, action) => {
        state.RefillReqStatsCard.loading = false;
        state.RefillReqStatsCard.error = action.payload as string;
      });
  },
});

export default RefillInsightsSlice.reducer;
export const RefillInsightsReducer = RefillInsightsSlice.reducer;
