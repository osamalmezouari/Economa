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
      return rejectWithValue('Something went wrong.');
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
      return rejectWithValue('Something went wrong.',
      );
    }
  }
);


export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await ordersApi.getOrderById(orderId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order details'
      );
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async (data: { page: number }, { rejectWithValue }) => {
    try {
      const response = await ordersApi.getUserOrders(data.page);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user orders'
      );
    }
  }
);