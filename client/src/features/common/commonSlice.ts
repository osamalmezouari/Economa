import { common } from '@mui/material/colors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImagePreviewState {
  visible: boolean;
  imagePreview: string;
}

interface CommonState {
  imagePreviewState: ImagePreviewState;
}

const initialState: CommonState = {
  imagePreviewState: {
    visible: false,
    imagePreview: '',
  },
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
  },
});

export const { setVisible, setImagePreview } = commonSlice.actions;
export default commonSlice.reducer;
export const commonReducer = commonSlice.reducer;
