import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { couponStoreType } from '../../types/coupon';
import { verfyCoupon } from './couponThunk';

const initialState: couponStoreType = {
  verifyCoupon: {
    data: {
      code: '',
    },
    loading: false,
    error: null,
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
        state.verifyCoupon.error = null;
      })
      .addCase(verfyCoupon.fulfilled, (state, action) => {
        state.verifyCoupon.loading = false;
        state.verifyCoupon.error = null;
        state.verifyCoupon.data = action.payload;
      })
      .addCase(verfyCoupon.rejected, (state, action: PayloadAction<any>) => {
        state.verifyCoupon.loading = false;
        state.verifyCoupon.error = action.payload;
      });
  },
});

export default CouponSlice.reducer;
export const CouponReducer = CouponSlice.reducer;
