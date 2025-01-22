import { createSlice } from '@reduxjs/toolkit';
import { refillBalanceRequest } from './balanceThunk';
import { balanceStateType } from '../../types/refillbalance';

const initialState: balanceStateType = {
  refillBalanceRequest: {
    loading: false,
    error: null,
    data: {
      paymentType: 'cash',
      file: null,
      amount: 0,
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
      });
  },
});

export default balanceSlice.reducer;
export const balanceReducer = balanceSlice.reducer;
