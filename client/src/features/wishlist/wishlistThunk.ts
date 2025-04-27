import { createAsyncThunk } from '@reduxjs/toolkit';
import * as wishListApi from '../../api/wishList';

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const wishlist = await wishListApi.GetWishList();
      return wishlist;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.',
      );
    }
  }
);

export const createWishList = createAsyncThunk(
  'wishlist/createWishList',
  async (productId: string, { rejectWithValue }) => {
    try {
      const wishlist = await wishListApi.createWishList(productId);
      return wishlist;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue( 'Something went wrong.',
      );
    }
  }
);

export const removefromWishList = createAsyncThunk(
  'wishlist/removefromWishList',
  async (id: string, { rejectWithValue }) => {
    try {
      const wishlist = await wishListApi.removefromWishList(id);
      return wishlist;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.',
      );
    }
  }
);
