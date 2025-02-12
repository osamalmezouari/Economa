import { createSlice } from '@reduxjs/toolkit';
import { WishlistState } from '../../types/wishlist';
import {
  createWishList,
  getWishlist,
  removefromWishList,
} from './wishlistThunk';

const initialState: WishlistState = {
  wishlist: {
    data: [],
    loading: false,
    error: '',
  },
  createWishList: {
    data: {},
    loading: false,
    error: '',
  },
  removefromWishList: {
    data: {},
    loading: false,
    error: '',
  },
  open: false,
};

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setDisplayWishlist: (state, action: { payload?: boolean }) => {
      return {
        ...state,
        open: action.payload !== undefined ? action.payload : !state.open,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.wishlist.loading = true;
        state.wishlist.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist.loading = false;
        state.wishlist.error = null;
        state.wishlist.data = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.wishlist.loading = false;
        state.wishlist.error = action.payload;
      })
      .addCase(createWishList.pending, (state) => {
        state.createWishList.loading = true;
        state.createWishList.error = null;
      })
      .addCase(createWishList.fulfilled, (state, action) => {
        state.createWishList.loading = false;
        state.createWishList.error = null;
        state.createWishList.data = action.payload;
      })
      .addCase(createWishList.rejected, (state, action) => {
        state.createWishList.loading = false;
        state.createWishList.error = action.payload;
      })
      .addCase(removefromWishList.pending, (state) => {
        state.removefromWishList.loading = true;
        state.removefromWishList.error = null;
      })
      .addCase(removefromWishList.fulfilled, (state, action) => {
        state.removefromWishList.loading = false;
        state.removefromWishList.error = null;
        state.removefromWishList.data = action.payload;
      })
      .addCase(removefromWishList.rejected, (state, action) => {
        state.removefromWishList.loading = false;
        state.removefromWishList.error = action.payload;
      });
  },
});

export default WishlistSlice.reducer;
export const wishlistReducer = WishlistSlice.reducer;
export const { setDisplayWishlist } = WishlistSlice.actions;
