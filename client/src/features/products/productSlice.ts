import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addReview,
  CreateProduct,
  getManageProductsTable,
  getProductById,
  getproductsCards,
  getProductsDetails,
  getProductsNewArrivals,
  getProductsStore,
  UpdateProduct,
} from './productThunk';
import {
  ManageProductsFilters,
  ProductCardType,
  ProductsNewArrivals,
  ProductStateType,
  ProductStoreType,
  StoreFilters,
} from '../../types/product';

const initialState: ProductStateType = {
  createProduct: {
    data: {
      name: '',
      description: '',
      price: 0,
      cost_price: 0,
      discount: 0,
      categoryId: '',
      unitname: '',
      file: null, //
    },
    loading: false,
    error: '',
  },
  updateProduct: {
    data: {
      name: '',
      description: '',
      price: 0,
      cost_price: 0,
      discount: 0,
      categoryId: '',
      unitname: '',
      file: null, //
    },
    loading: false,
    error: '',
  },
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
      rating: 0,
    },
    loading: false,
    error: '',
  },
  productsManage: {
    data: {
      products: [],
      totalProducts: 0,
      productspageCount: 0,
    },
    loading: false,
    error: '',
  },
  manageProductsFilters: {
    filters: {
      page: 1,
      search: '',
      category: '',
      min_price: 1,
      max_price: 50,
      min_stock: 0,
      max_stock: 50,
    },
    openFilters: false,
  },
  productById: {
    data: {
      id: '',
      name: '',
      description: '',
      price: 0,
      cost_price: 0,
      discount: 0,
      unitname: '',
      categoryId: '',
    },
    loading: false,
    error: '',
  },
  isAddProductOpen: false,
  isEditProductOpen: false,
  productToEditId: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: <K extends keyof StoreFilters>(
      state: any,
      action: PayloadAction<{ key: K; value: StoreFilters[K] }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    setManageFilter: <K extends keyof ManageProductsFilters>(
      state: any,
      action: PayloadAction<{ key: K; value: ManageProductsFilters[K] }>
    ) => {
      const { key, value } = action.payload;
      state.manageProductsFilters.filters[key] = value;
    },
    setOpenFilter: (state) => {
      state.manageProductsFilters.openFilters =
        !state.manageProductsFilters.openFilters;
    },
    openAddProductDialog: (state) => {
      state.isAddProductOpen = true;
    },
    closeAddProductDialog: (state) => {
      state.isAddProductOpen = false;
    },

    openupdateProductDialog: (state) => {
      state.isEditProductOpen = true;
    },
    closeupdateProductDialog: (state) => {
      state.isEditProductOpen = false;
    },
    setProductIdToEdit: (state, action) => {
      state.productToEditId = action.payload;
    },
    clearProductIdToEdit: (state) => {
      state.productToEditId = '';
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
      })

      //manage products
      .addCase(getManageProductsTable.pending, (state) => {
        state.productsManage.loading = true;
        state.productsManage.error = '';
      })
      .addCase(getManageProductsTable.rejected, (state, action) => {
        state.productsManage.loading = false;
        state.productsManage.error = action.payload as string;
      })
      .addCase(getManageProductsTable.fulfilled, (state, action) => {
        state.productsManage.loading = false;
        state.productsManage.error = '';
        state.productsManage.data = action.payload;
      })

      //Create Product
      .addCase(CreateProduct.pending, (state) => {
        state.createProduct.loading = true;
        state.createProduct.error = '';
      })
      .addCase(CreateProduct.rejected, (state, action) => {
        state.createProduct.loading = false;
        state.createProduct.error = action.payload as string;
      })
      .addCase(CreateProduct.fulfilled, (state, action) => {
        state.createProduct.loading = false;
        state.createProduct.error = '';
        state.createProduct.data = action.payload;
      })

      //Update Product
      .addCase(UpdateProduct.pending, (state) => {
        state.updateProduct.loading = true;
        state.updateProduct.error = '';
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.updateProduct.loading = false;
        state.updateProduct.error = action.payload as string;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.updateProduct.loading = false;
        state.updateProduct.error = '';
        state.updateProduct.data = action.payload;
      })

      .addCase(getProductById.pending, (state) => {
        state.productById.loading = true;
        state.productById.error = '';
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.productById.loading = false;
        state.productById.error = action.payload as string;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productById.loading = false;
        state.productById.error = '';
        state.productById.data = action.payload;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export default productsSlice.reducer;
export const {
  setFilters,
  setManageFilter,
  setOpenFilter,
  closeAddProductDialog,
  openAddProductDialog,
  closeupdateProductDialog,
  openupdateProductDialog,
  setProductIdToEdit,
  clearProductIdToEdit,
} = productsSlice.actions;
