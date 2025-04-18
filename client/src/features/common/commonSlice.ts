import { common } from '@mui/material/colors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImagePreviewState {
  visible: boolean;
  imagePreview: string;
}

interface CommonState {
  imagePreviewState: ImagePreviewState;
  isSearchDialogOpen: boolean;
}

const initialState: CommonState = {
  imagePreviewState: {
    visible: false,
    imagePreview: '',
  },
  isSearchDialogOpen: false,
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
  },
});

export const { setVisible, setImagePreview, setSearchDialogOpen } = commonSlice.actions;
export default commonSlice.reducer;
export const commonReducer = commonSlice.reducer;
