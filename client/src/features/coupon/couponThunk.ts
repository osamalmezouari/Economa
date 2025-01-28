import { createAsyncThunk } from '@reduxjs/toolkit';
import { verfy_coupon } from '../../api/coupon';

export const verfyCoupon = createAsyncThunk(
  'verfy_coupon',
  (data: { code: string }, { rejectWithValue }) => {
    try {
      const coupon = verfy_coupon(data);
      return coupon;
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
