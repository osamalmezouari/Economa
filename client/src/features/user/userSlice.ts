import { createSlice } from '@reduxjs/toolkit';
import {
  createUser,
  updateUser,
  UserDetails,
  userStateType,
} from '../../types/user';
import {
  adminCreate,
  adminUpdate,
  getShoortedUserInfo,
  getUserById,
  getUsersList,
} from './userThunk';

const initialState: userStateType = {
  ShoortedUserInfo: {
    data: {
      email: '',
      name: '',
    },
    loading: false,
    error: '',
  },
  UserDetails: {
    data: {
      users: [],
      pageCount: 0,
    },
    loading: false,
    error: '',
  },
  getUserById: {
    data: {} as UserDetails,
    loading: false,
    error: '',
  },
  createUser: {
    data: {} as createUser,
    loading: false,
    error: '',
  },
  updateUser: {
    data: {} as updateUser,
    loading: false,
    error: '',
  },
  userToEditId: '',
  isEditUserOpen: false,
  isAddUserOpen: false,
};

const UserStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openAddUserDialog: (state) => {
      state.isAddUserOpen = true;
    },
    closeAddUserDialog: (state) => {
      state.isAddUserOpen = false;
    },
    openUpdateUserDialog: (state) => {
      state.isEditUserOpen = true;
    },
    closeUpdateUserDialog: (state) => {
      state.isEditUserOpen = false;
    },
    setusertoEdit: (state, action) => {
      state.userToEditId = action.payload;
    },
  },
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
      })

      .addCase(getUsersList.pending, (state) => {
        state.UserDetails.loading = true;
        state.UserDetails.error = '';
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.UserDetails.loading = false;
        state.UserDetails.error = '';
        state.UserDetails.data = action.payload;
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.UserDetails.loading = false;
        state.UserDetails.error = action.payload as string;
      })

      .addCase(getUserById.pending, (state) => {
        state.getUserById.loading = true;
        state.getUserById.error = '';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.getUserById.loading = false;
        state.getUserById.error = '';
        state.getUserById.data = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.getUserById.loading = false;
        state.getUserById.error = action.payload as string;
      })

      .addCase(adminCreate.pending, (state) => {
        state.createUser.loading = true;
        state.createUser.error = '';
      })
      .addCase(adminCreate.fulfilled, (state, action) => {
        state.createUser.loading = false;
        state.createUser.error = '';
        state.createUser.data = action.payload;
      })
      .addCase(adminCreate.rejected, (state, action) => {
        state.createUser.loading = false;
        state.createUser.error = action.payload as string;
      })

      .addCase(adminUpdate.pending, (state) => {
        state.updateUser.loading = true;
        state.updateUser.error = '';
      })
      .addCase(adminUpdate.fulfilled, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.error = '';
        state.updateUser.data = action.payload;
      })
      .addCase(adminUpdate.rejected, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.error = action.payload as string;
      });
  },
});

export const {
  openAddUserDialog,
  closeAddUserDialog,
  openUpdateUserDialog,
  closeUpdateUserDialog,
  setusertoEdit
} = UserStore.actions;
export default UserStore.reducer;
export const UserReducer = UserStore.reducer;
