import { createAsyncThunk } from '@reduxjs/toolkit';
import * as categoryApi from '../../api/category';

export const getCategoryCards = createAsyncThunk(
  'category/getCategoryCards',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.CategoryCards();
      return categories;
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
