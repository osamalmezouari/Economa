import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentStoreType } from '../../types/payments';
import { getPaymentTransactions } from './paymentThunk';

const initialState: PaymentStoreType = {
  Transactions: {
    data: {
      payments: [],
      pageCount: 0,
    },
    loading: false,
    error: '',
  },
};

const PaymentsSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentTransactions.pending, (state) => {
        state.Transactions.loading = true;
        state.Transactions.error = '';
      })
      .addCase(getPaymentTransactions.fulfilled, (state, action) => {
        state.Transactions.loading = false;
        state.Transactions.error = '';
        state.Transactions.data = action.payload;
      })
      .addCase(
        getPaymentTransactions.rejected,
        (state, action: PayloadAction<any>) => {
          state.Transactions.loading = false;
          state.Transactions.error = action.payload as string;
        }
      );
  },
});

export default PaymentsSlice.reducer;
export const PaymentsReducer = PaymentsSlice.reducer;
