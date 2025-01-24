import { createSlice } from '@reduxjs/toolkit';
import { getbalanceCardInfo, refillBalanceRequest } from './balanceThunk';
import { balanceStateType } from '../../types/balance';

const initialState: balanceStateType = {
  refillBalanceRequest: {
    loading: false,
    error: null,
    data: {
      paymentType: 'cash',
      file: null,
      amount: 0,
      reqStatus: { statusCode: null, message: null },
    },
  },
  balanceCard: {
    loading: false,
    error: null,
    data: {
      Balance: 0,
      name: '',
    },
  },
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setRefillBalanceRequest: (state, action) => {
      state.refillBalanceRequest.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refillBalanceRequest.pending, (state) => {
        state.refillBalanceRequest.loading = true;
        state.refillBalanceRequest.error = null;
      })
      .addCase(refillBalanceRequest.fulfilled, (state, action) => {
        state.refillBalanceRequest.loading = false;
        state.refillBalanceRequest.error = null;
        state.refillBalanceRequest.data = action.payload;
      })
      .addCase(refillBalanceRequest.rejected, (state, action) => {
        state.refillBalanceRequest.loading = false;
        state.refillBalanceRequest.error = action.payload;
      })
      .addCase(getbalanceCardInfo.pending, (state) => {
        state.balanceCard.loading = true;
        state.balanceCard.error = null;
      })
      .addCase(getbalanceCardInfo.fulfilled, (state, action) => {
        state.balanceCard.loading = false;
        state.balanceCard.error = null;
        state.balanceCard.data = action.payload;
      })
      .addCase(getbalanceCardInfo.rejected, (state, action) => {
        state.balanceCard.loading = false;
        state.balanceCard.error = action.payload;
      });
    },
});

export default balanceSlice.reducer;
export const balanceReducer = balanceSlice.reducer;
