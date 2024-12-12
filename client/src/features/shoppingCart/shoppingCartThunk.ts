import { createAsyncThunk } from '@reduxjs/toolkit';
import * as shoopingCartApi from '../../api/shoopingCart';

export const getshoppingCart = createAsyncThunk(
  '/shoppingCart/withProducts',
  async (_, { rejectWithValue }) => {
    try {
      const shoppingCartdata = await shoopingCartApi.shoppingCart();
      return shoppingCartdata;
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

export const createshoppingCart = createAsyncThunk(
  'shoppingCart/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const shoppingCart = await shoopingCartApi.createshoppingCart(data);
      return shoppingCart;
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

export const updatequantity = createAsyncThunk(
  '/shoppingCart/update',
  async (
    { id, quantity }: { id: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const updatequantity = await shoopingCartApi.updatequantityapi(
        id,
        quantity
      );
      return updatequantity;
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

export const removefromshoppingCart = createAsyncThunk(
  '/shoppingCart/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      const removefromshoppingCart = await shoopingCartApi.removefromshoppingCart(
        id
      );
      return removefromshoppingCart;
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