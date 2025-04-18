import { createSlice } from '@reduxjs/toolkit';
import { getOrdersHistory, placeandpay } from './orderThunk';
import { OrderStateType } from '../../types/order';

const initialState: OrderStateType = {
  placeandpay: {
    loading: false,
    error: '',
    data: {
      orderId: '',
    },
  },
  OrdersHistory: {
    loading: false,
    error: '',
    data: {
      orders: [],
      pageCount: 0,
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
      })

      .addCase(getOrdersHistory.pending, (state) => {
        state.OrdersHistory.loading = true;
        state.OrdersHistory.error = '';
      })
      .addCase(getOrdersHistory.fulfilled, (state, action) => {
        state.OrdersHistory.data = action.payload;
        state.OrdersHistory.error = '';
        state.OrdersHistory.loading = false;
      })
      .addCase(getOrdersHistory.rejected, (state, action) => {
        state.OrdersHistory.error = action.payload as string;
        state.OrdersHistory.loading = false;
      });
  },
});

export const { clearOrderId } = OrderSlice.actions;
export default OrderSlice.reducer;
export const OrderReducer = OrderSlice.reducer;
