import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImagePreviewState {
  visible: boolean;
  imagePreview: string;
}

interface CommonState {
  imagePreviewState: ImagePreviewState;
  isSearchDialogOpen: boolean;
  isNotificationOpen: boolean;
  isProfileMenuOpen: boolean;
}

const initialState: CommonState = {
  imagePreviewState: {
    visible: false,
    imagePreview: '',
  },
  isSearchDialogOpen: false,
  isNotificationOpen: false,
  isProfileMenuOpen: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.imagePreviewState.visible = action.payload;
    },
    setImagePreview: (state, action: PayloadAction<string>) => {
      state.imagePreviewState.imagePreview = action.payload;
    },
    setSearchDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchDialogOpen = action.payload;
    },
    setNotificationOpen: (state, action: PayloadAction<boolean>) => {
      state.isNotificationOpen = action.payload;
    },
    setProfileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isProfileMenuOpen = action.payload;
    },
  },
});

export const { setVisible, setImagePreview, setSearchDialogOpen, setNotificationOpen, setProfileMenuOpen } = commonSlice.actions;
export default commonSlice.reducer;
export const commonReducer = commonSlice.reducer;
