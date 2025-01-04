import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getproductsCards,
  getProductsDetails,
  getProductsNewArrivals,
  getProductsStore,
} from './productThunk';
import {
  ProductCardStateType,
  ProductCardType,
  ProductsNewArrivals,
  ProductStoreType,
} from '../../types/product';
import { StoreFilters } from '../../types/storeFilters';

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
  productsStore: {
    data: {
      productPageCount: 0,
      products: [],
    },
    loading: false,
    error: null,
  },
  filters: {
    category: '',
    search: '',
    weight: '',
    Minprice: 0,
    Maxprice: 0,
    page: 1,
    sort: '',
  },
  productsDetails: {
    data: {
      product: {
        id: '',
        discount: 0,
        name: '',
        categoryName: '',
        description: '',
        productAvgRating: 0,
        price: '',
        priceWithDiscount: 0,
        unit: '',
        imageLink: '',
        categoryId: '',
        reviewsCount: 0,
        inStock: false,
      },
      reviews: [],
      HighlyRighted: [],
      relatedProducts: [],
    },
    loading: false,
    error: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: <K extends keyof StoreFilters>(
      state,
      action: PayloadAction<{ key: K; value: StoreFilters[K] }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
  },
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
      .addCase(getProductsNewArrivals.rejected, (state, action) => {
        state.productsNewArrivals.loading = false;
        state.productsNewArrivals.error = action.payload;
      })
      .addCase(
        getProductsNewArrivals.fulfilled,
        (state, action: PayloadAction<ProductsNewArrivals[]>) => {
          state.productsNewArrivals.loading = false;
          state.productsNewArrivals.error = null;
          state.productsNewArrivals.data = action.payload;
        }
      )

      //storeproducts
      .addCase(getProductsStore.pending, (state) => {
        state.productsStore.loading = true;
        state.productsStore.error = null;
      })
      .addCase(getProductsStore.rejected, (state, action) => {
        state.productsStore.loading = false;
        state.productsStore.error = action.payload;
      })
      .addCase(
        getProductsStore.fulfilled,
        (state, action: PayloadAction<ProductStoreType>) => {
          state.productsStore.loading = false;
          state.productsStore.error = null;
          state.productsStore.data = action.payload;
        }
      )

      //products Details
      .addCase(getProductsDetails.pending, (state) => {
        state.productsDetails.loading = true;
        state.productsDetails.error = null;
      })
      .addCase(getProductsDetails.rejected, (state, action) => {
        state.productsDetails.loading = false;
        state.productsDetails.error = action.payload;
      })
      .addCase(getProductsDetails.fulfilled, (state, action) => {
        state.productsDetails.loading = false;
        state.productsDetails.error = null;
        state.productsDetails.data = action.payload;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export default productsSlice.reducer;
export const { setFilters } = productsSlice.actions;
