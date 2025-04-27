import { AuthState } from '../../types/auth';
import { Login, Register } from './authThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  Login: {
    loading: false,
    error: '',
    data: '',
  },
  Register: {
    loading: false,
    error: '',
    data: [],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    {
      builder
        .addCase(Register.pending, (state) => {
          state.Register.loading = true;
          state.Register.error = '';
        })
        .addCase(Register.fulfilled, (state, action) => {
          state.Register.loading = false;
          state.Register.error = '';
          state.Register.data = action.payload;
        })
        .addCase(Register.rejected, (state, action) => {
          state.Register.loading = false;
          state.Register.error = action.payload as string;
        })
        .addCase(Login.pending, (state) => {
          state.Login.loading = true;
          state.Login.error = '';
        })
        .addCase(Login.fulfilled, (state, action) => {
          state.Login.loading = false;
          state.Login.error = '';
          state.Login.data = action.payload;
          // Token is now handled by AuthContext
          // localStorage.setItem('token', action.payload);
        })
        .addCase(Login.rejected, (state, action) => {
          state.Login.loading = false;
          state.Login.error = action.payload as string;
        });
    }
  },
});

export default authSlice.reducer;
export const authReducer = authSlice.reducer;
