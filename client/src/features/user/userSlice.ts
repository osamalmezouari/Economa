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
    error: null,
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
        state.ShoortedUserInfo.error = null;
      })
      .addCase(getShoortedUserInfo.fulfilled, (state, action) => {
        state.ShoortedUserInfo.loading = false;
        state.ShoortedUserInfo.error = null;
        state.ShoortedUserInfo.data = action.payload;
      })
      .addCase(getShoortedUserInfo.rejected, (state) => {
        state.ShoortedUserInfo.loading = true;
        state.ShoortedUserInfo.error = null;
      });
  },
});

export default UserStore.reducer;
export const UserReducer = UserStore.reducer;
