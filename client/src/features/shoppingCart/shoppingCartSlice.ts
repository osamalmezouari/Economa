import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createshoppingCart,
  getshoppingCart,
  removefromshoppingCart,
  updatequantity,
} from './shoppingCartThunk';
import {
  createShoppingCart,
  shoppingCartStateType,
} from '../../types/shoppingCart';

import { ShoopingCartType } from '../../types/shoppingCart';
const initialState: shoppingCartStateType = {
  shoppingCartWithProducts: {
    data: [],
    loading: false,
    error: null,
  },
  createshoppingCart: {
    data: {},
    loading: false,
    error: null,
  },
  removefromshoppingCart: {
    data: {},
    loading: false,
    error: null,
  },
  open: true,
  basePrice: 0,
  totalPrice: 0,
  vat: 0,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setTotalPrice: (state) => {
      state.totalPrice = state.basePrice;
    },
    setvat: (state) => {
      state.vat = state.basePrice * 0.2;
    },
    setBasePrice: (state) => {
      state.basePrice = state.shoppingCartWithProducts.data.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
      );
    },
    setDisplayCart: (state, action: { payload?: boolean }) => {
      return {
        ...state,
        open: action.payload !== undefined ? action.payload : !state.open,
      };
    },

    clearCreateError: (state) => {
      state.createshoppingCart.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getshoppingCart.pending, (state) => {
        state.shoppingCartWithProducts.loading = true;
        state.shoppingCartWithProducts.error = null;
      })
      .addCase(getshoppingCart.fulfilled, (state, action: any) => {
        state.shoppingCartWithProducts.loading = false;
        state.shoppingCartWithProducts.error = null;
        state.shoppingCartWithProducts.data = action.payload;
        state.basePrice = action.payload.reduce(
          (total: number, item: ShoopingCartType) =>
            total + item.productPrice * item.quantity,
          0
        );
        state.vat = state.basePrice * 0.2;
        state.totalPrice = state.basePrice;
      })
      .addCase(getshoppingCart.rejected, (state, action) => {
        state.shoppingCartWithProducts.loading = false;
        state.shoppingCartWithProducts.error = action.payload;
        state.shoppingCartWithProducts.data = [];
      })
      .addCase(updatequantity.fulfilled, (state, action: any) => {
        const updatedItem = action.payload;
        const itemIndex = state.shoppingCartWithProducts.data.findIndex(
          (item: ShoopingCartType) => item.id === updatedItem.id
        );

        if (itemIndex !== -1) {
          state.shoppingCartWithProducts.data[itemIndex].quantity =
            updatedItem.quantity;
        }
        state.basePrice = state.shoppingCartWithProducts.data.reduce(
          (total, item) => total + item.productPrice * item.quantity,
          0
        );
        state.vat = state.basePrice * 0.2;
        state.totalPrice = state.basePrice;
      })

      .addCase(createshoppingCart.pending, (state) => {
        state.createshoppingCart.loading = true;
        state.createshoppingCart.error = null;
      })
      .addCase(
        createshoppingCart.fulfilled,
        (state, action: PayloadAction<createShoppingCart>) => {
          state.createshoppingCart.loading = false;
          state.createshoppingCart.data = action.payload;
        }
      )
      .addCase(createshoppingCart.rejected, (state, action) => {
        state.createshoppingCart.loading = false;
        state.createshoppingCart.error = action.payload;
      })

      .addCase(removefromshoppingCart.rejected, (state, action) => {
        state.createshoppingCart.loading = false;
        state.createshoppingCart.error = action.payload;
      })
      .addCase(removefromshoppingCart.pending, (state) => {
        state.createshoppingCart.loading = true;
        state.createshoppingCart.error = null;
      })
      .addCase(removefromshoppingCart.fulfilled, (state, action) => {
        state.createshoppingCart.loading = false;
        state.createshoppingCart.data = action.payload;
      });
  },
});

export default shoppingCartSlice.reducer;
export const shoppingCartReducer = shoppingCartSlice.reducer;
export const { setDisplayCart, clearCreateError } = shoppingCartSlice.actions;
