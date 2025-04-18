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

export const getUsersList = createAsyncThunk(
  '/user/list',
  async (data: { search: string; page: number }, { rejectWithValue }) => {
    try {
      const users = await userApi.getUsersList(data.page, data.search);
      return users;
    } catch (error: any) {
      if (error) {
        rejectWithValue(error);
      }
      return rejectWithValue({
        message: 'failed to fetch user list',
      });
    }
  }
);

export const adminCreate = createAsyncThunk(
  '/user/adminCreate',
  async (userData: FormData, { rejectWithValue }) => {
    try {
      const user = await userApi.adminCreate(userData);
      return user;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: 'Failed to create user',
      });
    }
  }
);

export const adminUpdate = createAsyncThunk(
  '/user/adminUpdate',
  async (data: { id: string; userData: FormData }, { rejectWithValue }) => {
    try {
      const user = await userApi.adminUpdate(data.id, data.userData);
      return user;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: 'Failed to update user',
      });
    }
  }
);

export const getUserById = createAsyncThunk(
  '/user/byId',
  async (id: string, { rejectWithValue }) => {
    try {
      const user = await userApi.getUserById(id);
      return user;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: 'Failed to fetch user',
      });
    }
  }
);
