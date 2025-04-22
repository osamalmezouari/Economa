import { createAsyncThunk } from '@reduxjs/toolkit';
import * as compareApi from '../../api/compare';

export const getComparedProductDetails = createAsyncThunk(
  'get/products/ComparedProductDetails',
  async (ids: string[], { rejectWithValue }) => {
    try {
      const comparedData = await compareApi.getComparedProductDetails(ids);
      return comparedData;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Something went wrong.');
    }
  }
);
