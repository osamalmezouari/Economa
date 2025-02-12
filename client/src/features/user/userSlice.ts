import { createSlice } from '@reduxjs/toolkit';
import { userStateType } from '../../types/user';
import { getShoortedUserInfo } from './userThunk';

const initialState: userStateType = {
  ShoortedUserInfo: {
    data: {
      email: '',
      name: '',
    },
    loading: false,
    error: '',
  },
};

const UserStore = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoortedUserInfo.pending, (state) => {
        state.ShoortedUserInfo.loading = true;
        state.ShoortedUserInfo.error = '';
      })
      .addCase(getShoortedUserInfo.fulfilled, (state, action) => {
        state.ShoortedUserInfo.loading = false;
        state.ShoortedUserInfo.error = '';
        state.ShoortedUserInfo.data = action.payload;
      })
      .addCase(getShoortedUserInfo.rejected, (state, action) => {
        state.ShoortedUserInfo.loading = true;
        state.ShoortedUserInfo.error = action.payload as string;
      });
  },
});

export default UserStore.reducer;
export const UserReducer = UserStore.reducer;
