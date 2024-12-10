import { AuthState } from '../../types/auth';
import { Login, Register } from './authThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  Login: {
    loading: false,
    error: null,
    data: [],
  },
  Register: {
    loading: false,
    error: null,
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
          state.Register.error = null;
        })
        .addCase(Register.fulfilled, (state, action) => {
          state.Register.loading = false;
          state.Register.error = null;
          state.Register.data = action.payload;
        })
        .addCase(Register.rejected, (state, action) => {
          state.Register.loading = false;
          state.Register.error = action.payload;
        })
        .addCase(Login.pending, (state) => {
          state.Login.loading = true;
          state.Login.error = null;
        })
        .addCase(Login.fulfilled, (state, action) => {
          state.Login.loading = false;
          state.Login.error = null;
          state.Login.data = action.payload;
          localStorage.setItem('token', action.payload);
        })
        .addCase(Login.rejected, (state, action) => {
          state.Login.loading = false;
          state.Login.error = action.payload;
        });
    }
  },
});

export default authSlice.reducer;
export const authReducer = authSlice.reducer;
