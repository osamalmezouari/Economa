import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { couponStoreType } from '../../types/coupon';
import { verfyCoupon } from './couponThunk';

const initialState: couponStoreType = {
  verifyCoupon: {
    data: {
      code: '',
      verified: false,
      discount_type: '',
      discount_value: 0,
    },
    loading: false,
    error: '',
  },
};

const CouponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verfyCoupon.pending, (state) => {
        state.verifyCoupon.loading = true;
        state.verifyCoupon.error = '';
      })
      .addCase(verfyCoupon.fulfilled, (state, action) => {
        state.verifyCoupon.loading = false;
        state.verifyCoupon.error = '';
        state.verifyCoupon.data = action.payload;
      })
      .addCase(verfyCoupon.rejected, (state, action: PayloadAction<any>) => {
        state.verifyCoupon.loading = false;
        state.verifyCoupon.error = action.payload as string;
      });
  },
});

export default CouponSlice.reducer;
export const CouponReducer = CouponSlice.reducer;
