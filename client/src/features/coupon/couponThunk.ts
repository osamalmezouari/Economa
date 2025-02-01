import { createAsyncThunk } from '@reduxjs/toolkit';
import { verfy_coupon } from '../../api/coupon';
import { verfy_coupon_type } from '../../types/coupon';

export const verfyCoupon = createAsyncThunk(
  'verfy_coupon',
  async (data : verfy_coupon_type, { rejectWithValue }) => {
    try {
      const coupon = await verfy_coupon(data);
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
