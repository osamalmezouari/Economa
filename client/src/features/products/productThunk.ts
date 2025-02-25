import { createAsyncThunk } from '@reduxjs/toolkit';
import * as productsApi from '../../api/products';
import { AddReview } from '../../types/review';
import { addreview } from '../../api/productReview';
import { StoreFilters } from '../../types/product';

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
