import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getproductsCards, getProductsNewArrivals } from './productThunk';
import {
  ProductCardStateType,
  ProductCardType,
  ProductsNewArrivals,
} from '../../types/product';

const initialState: ProductCardStateType = {
  productsCard: {
    data: [],
    loading: false,
    error: null,
  },
  productsNewArrivals: {
    data: [],
    loading: false,
    error: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //products cards
      .addCase(getproductsCards.pending, (state) => {
        state.productsCard.loading = true;
        state.productsCard.error = null;
      })
      .addCase(getproductsCards.rejected, (state, action) => {
        state.productsCard.loading = false;
        state.productsCard.error = action.payload as string;
      })
      .addCase(
        getproductsCards.fulfilled,
        (state, action: PayloadAction<ProductCardType[]>) => {
          state.productsCard.loading = false;
          state.productsCard.error = null;
          state.productsCard.data = action.payload;
        }
      )

      //new Arrivals
      .addCase(getProductsNewArrivals.pending, (state) => {
        state.productsNewArrivals.loading = true;
        state.productsNewArrivals.error = null;
      })
      .addCase(
        getProductsNewArrivals.rejected,
        (state, action) => {
          state.productsNewArrivals.loading = false;
          state.productsNewArrivals.error = action.payload;
        }
      )
      .addCase(
        getProductsNewArrivals.fulfilled,
        (state, action: PayloadAction<ProductsNewArrivals[]>) => {
          state.productsNewArrivals.loading = false;
          state.productsNewArrivals.error = null;
          state.productsNewArrivals.data = action.payload;
        }
      );
  },
});

export const productsReducer = productsSlice.reducer;
export default productsSlice.reducer;
