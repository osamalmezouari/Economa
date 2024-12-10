import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload, RegisterPayload } from '../../types/auth';
import * as authApi from '../../api/auth';

export const Register = createAsyncThunk(
    'auth/register',
    async (data: RegisterPayload, { rejectWithValue }) => {
      try {
        const newRegister = await authApi.Register(data);
        return newRegister;
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
  

export const Login = createAsyncThunk(
  'auth/login',
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const newLogin = authApi.Login(data);
      return newLogin;
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
