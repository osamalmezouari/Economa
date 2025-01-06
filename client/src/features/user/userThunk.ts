import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../api/users';

export const getShoortedUserInfo = createAsyncThunk(
  '/user/byEmail',
  async (_, { rejectWithValue }) => {
    try {
      const user = await userApi.getUser();
      return user;
    } catch (error: any) {
      if (error) {
        rejectWithValue(error);
      }
      return rejectWithValue({
        message: 'failed to fetch user shooreted info',
      });
    }
  }
);
