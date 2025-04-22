import { createAsyncThunk } from '@reduxjs/toolkit';
import * as categoryApi from '../../api/category';

export const getCategoryList = createAsyncThunk(
  'category/getCategoryList',
  async (page: number, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.CategoryList(page);
      return categories;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.');
    }
  }
);

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
      return rejectWithValue('Something went wrong.');
    }
  }
);

export const getCategoriesNamesandIds = createAsyncThunk(
  'category/CategoriesNamesandIds',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.getCategoriesNamesandIds();
      return categories;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.');
    }
  }
);

export const AddCategory = createAsyncThunk(
  'category/AddCategory',
  (category: FormData, { rejectWithValue }) => {
    try {
      return categoryApi.AddCategory(category);
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  (
    { formData, CategoryId }: { formData: FormData; CategoryId: string },
    { rejectWithValue }
  ) => {
    try {
      return categoryApi.updateCategory(formData, CategoryId);
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.');
    }
  }
);

export const getCategoryById = createAsyncThunk(
  'category/categoryById',
  (categoryId: string, { rejectWithValue }) => {
    try {
      return categoryApi.getCategoryById(categoryId);
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.');
    }
  }
);
