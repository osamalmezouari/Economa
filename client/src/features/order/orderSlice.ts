import { createSlice } from '@reduxjs/toolkit';
import {
  getOrderById,
  getOrdersHistory,
  getUserOrders,
  placeandpay,
} from './orderThunk';
import { Order, OrderStateType } from '../../types/order';

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
  OrderById: {
    data: {
      id: '',
      userId: '',
      couponId: null,
      status: '',
      totalAmount: 0,
      createdAt: '',
      updatedAt: '',
      orderItems: [],
      user: {
        name: '',
        avatar: '',
        email: '',
      },
    },
    loading: false,
    error: '',
  },
  UserOrders: {
    data: {
      orders: [],
      pageCount: 1,
    },
    loading: false,
    error: '',
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
      })

      .addCase(getOrderById.pending, (state) => {
        state.OrderById.loading = true;
        state.OrderById.error = '';
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.OrderById.loading = false;
        state.OrderById.data = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.OrderById.loading = false;
        state.OrderById.error = action.payload as string;
      })

      .addCase(getUserOrders.pending, (state) => {
        state.UserOrders.loading = true;
        state.UserOrders.error = '';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.UserOrders.loading = false;
        state.UserOrders.data = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.UserOrders.loading = false;
        state.UserOrders.error = action.payload as string;
      });
  },
});

export const { clearOrderId } = OrderSlice.actions;
export default OrderSlice.reducer;
export const OrderReducer = OrderSlice.reducer;
