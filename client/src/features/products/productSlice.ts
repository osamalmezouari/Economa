import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addReview,
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
  StoreFilters,
} from '../../types/product';

const initialState: ProductCardStateType = {
  productsCard: {
    data: [],
    loading: false,
    error: '',
  },
  productsNewArrivals: {
    data: [],
    loading: false,
    error: '',
  },
  productsStore: {
    data: {
      productPageCount: 0,
      products: [],
    },
    loading: false,
    error: '',
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
    error: '',
  },
  addReview: {
    data: {
      productId: '',
      reviewText: '',
      email: '',
      mame: '',
      rating: 0
    },
    loading: false,
    error: '',
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
        state.productsCard.error = '';
      })
      .addCase(getproductsCards.rejected, (state, action) => {
        state.productsCard.loading = false;
        state.productsCard.error = action.payload as string;
      })
      .addCase(
        getproductsCards.fulfilled,
        (state, action: PayloadAction<ProductCardType[]>) => {
          state.productsCard.loading = false;
          state.productsCard.error = '';
          state.productsCard.data = action.payload;
        }
      )

      //new Arrivals
      .addCase(getProductsNewArrivals.pending, (state) => {
        state.productsNewArrivals.loading = true;
        state.productsNewArrivals.error = '';
      })
      .addCase(getProductsNewArrivals.rejected, (state, action) => {
        state.productsNewArrivals.loading = false;
        state.productsNewArrivals.error = action.payload as string;
      })
      .addCase(
        getProductsNewArrivals.fulfilled,
        (state, action: PayloadAction<ProductsNewArrivals[]>) => {
          state.productsNewArrivals.loading = false;
          state.productsNewArrivals.error = '';
          state.productsNewArrivals.data = action.payload;
        }
      )

      //storeproducts
      .addCase(getProductsStore.pending, (state) => {
        state.productsStore.loading = true;
        state.productsStore.error = '';
      })
      .addCase(getProductsStore.rejected, (state, action) => {
        state.productsStore.loading = false;
        state.productsStore.error = action.payload as string;
      })
      .addCase(
        getProductsStore.fulfilled,
        (state, action: PayloadAction<ProductStoreType>) => {
          state.productsStore.loading = false;
          state.productsStore.error = '';
          state.productsStore.data = action.payload;
        }
      )

      //products Details
      .addCase(getProductsDetails.pending, (state) => {
        state.productsDetails.loading = true;
        state.productsDetails.error = '';
      })
      .addCase(getProductsDetails.rejected, (state, action) => {
        state.productsDetails.loading = false;
        state.productsDetails.error = action.payload as string;
      })
      .addCase(getProductsDetails.fulfilled, (state, action) => {
        state.productsDetails.loading = false;
        state.productsDetails.error = '';
        state.productsDetails.data = action.payload;
      })

      //add Product Review
      .addCase(addReview.pending, (state) => {
        state.addReview.loading = true;
        state.addReview.error = '';
      })

      .addCase(addReview.fulfilled, (state, action) => {
        state.addReview.loading = false;
        state.addReview.error = '';
        state.addReview.data = action.payload;
      })

      .addCase(addReview.rejected, (state, action) => {
        state.addReview.loading = false;
        state.addReview.error = action.payload as string;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export default productsSlice.reducer;
export const { setFilters } = productsSlice.actions;
