import { createSlice } from '@reduxjs/toolkit';
import { placeandpay } from './orderThunk';
import { OrderStateType } from '../../types/order';

const initialState: OrderStateType = {
  placeandpay: {
    loading: false,
    error: '',
    data: {
      orderId: '',
    },
  },
};

const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    clearOrderId: (state) => {
      state.placeandpay.data.orderId = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeandpay.pending, (state) => {
        state.placeandpay.loading = true;
        state.placeandpay.error = '';
      })
      .addCase(placeandpay.fulfilled, (state, action) => {
        state.placeandpay.data = action.payload;
        state.placeandpay.error = '';
        state.placeandpay.loading = false;
      })
      .addCase(placeandpay.rejected, (state, action) => {
        state.placeandpay.error = action.payload as string;
        state.placeandpay.loading = false;
      });
  },
});

export const { clearOrderId } = OrderSlice.actions;
export default OrderSlice.reducer;
export const OrderReducer = OrderSlice.reducer;
