import { createAsyncThunk } from '@reduxjs/toolkit';
import * as productsApi from '../../api/products';
import { AddReview } from '../../types/review';
import { addreview } from '../../api/productReview';
import {
  addStockTransaction,
  ManageProductsFilters,
  ManageProductsResponse,
  StoreFilters,
} from '../../types/product';

export const getProductsStore = createAsyncThunk(
  '/products/store',
  async (filters: StoreFilters, { rejectWithValue }) => {
    try {
      const products = await productsApi.getProductsStore(filters);
      return products;
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

export const getproductsCards = createAsyncThunk(
  '/products/getcards',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsApi.getProductsCards();
      return products;
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

export const getProductsNewArrivals = createAsyncThunk(
  '/products/getnewArrivals',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsApi.getProductsNewArrivals();
      return products;
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

export const getProductsDetails = createAsyncThunk(
  '/products/productdetails',
  async (productId: string, { rejectWithValue }) => {
    try {
      const products = await productsApi.getProductsDetails(productId);
      return products;
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

export const addReview = createAsyncThunk(
  '/products/addReview',
  async (reviewobj: AddReview, { rejectWithValue }) => {
    try {
      const review = await addreview(reviewobj);
      return review;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);

export const getManageProductsTable = createAsyncThunk<
  ManageProductsResponse,
  ManageProductsFilters
>('/products/manageProductsTable', async (filters, { rejectWithValue }) => {
  try {
    const response = await productsApi.getManageProductsTable(filters);
    return response;
  } catch (error: any) {
    if (error) {
      return rejectWithValue(error);
    }
    return rejectWithValue({
      message: error.message || 'Something went wrong',
    });
  }
});

export const CreateProduct = createAsyncThunk(
  '/products/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const product = await productsApi.CreateProduct(data);
      return product;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  '/products/update',
  async (
    { formData, productId }: { formData: FormData; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const product = await productsApi.UpdateProduct(productId, formData);
      return product;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);

export const getProductById = createAsyncThunk(
  '/products/byId',
  async (productId: string, { rejectWithValue }) => {
    try {
      const product = await productsApi.getproductById(productId);
      return product;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);

export const StockTransaction = createAsyncThunk(
  '/products/StockTransaction',
  async (page: number, { rejectWithValue }) => {
    try {
      const product = await productsApi.stockTransaction(page);
      return product;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);

export const AddStockTransaction = createAsyncThunk(
  '/products/addStockTransaction',
  async (data: addStockTransaction, { rejectWithValue }) => {
    try {
      const product = await productsApi.AddStockTransaction(data);
      return product;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);
