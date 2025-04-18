import { createAsyncThunk } from '@reduxjs/toolkit';
import { place_and_pay_order as place_and_pay_order_type } from '../../types/order';
import { place_and_pay_order } from '../../api/orders';
import * as ordersApi from '../../api/orders';

export const placeandpay = createAsyncThunk(
  'order/placeandpay',
  async (data: place_and_pay_order_type, { rejectWithValue }) => {
    try {
      const Order = await place_and_pay_order(data);
      return Order;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong.',
      });
    }
  }
);

export const getOrdersHistory = createAsyncThunk(
  'order/getOrdersHistory',
  async (data: { email: string; page: number }, { rejectWithValue }) => {
    try {
      const Orders = await ordersApi.getOrdersHistory(data.page, data.email);
      return Orders;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong.',
      });
    }
  }
);
