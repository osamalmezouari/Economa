import { createAsyncThunk } from '@reduxjs/toolkit';
import { place_and_pay_order as place_and_pay_order_type } from '../../types/order';
import { place_and_pay_order } from '../../api/orders';

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
