import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CategoriesnamesandIds,
  CategoryStateType,
  CategoryType,
} from '../../types/category';
import { getCategoriesNamesandIds, getCategoryCards } from './categoryThunk';

const initialState: CategoryStateType = {
  CategoryCards: {
    data: [],
    loading: false,
    error: '',
  },
  CategoriesnamesandIds: {
    data: [],
    loading: false,
    error: '',
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryCards.pending, (state) => {
        state.CategoryCards.loading = true;
        state.CategoryCards.error = '';
      })
      .addCase(
        getCategoryCards.fulfilled,
        (state, action: PayloadAction<CategoryType[]>) => {
          state.CategoryCards.loading = false;
          state.CategoryCards.error = '';
          state.CategoryCards.data = action.payload;
        }
      )
      .addCase(getCategoryCards.rejected, (state, action) => {
        state.CategoryCards.loading = false;
        state.CategoryCards.error = action.payload as string;
      })

      .addCase(getCategoriesNamesandIds.pending, (state) => {
        state.CategoriesnamesandIds.loading = true;
        state.CategoriesnamesandIds.error = '';
      })
      .addCase(
        getCategoriesNamesandIds.fulfilled,
        (state, action: PayloadAction<CategoriesnamesandIds[]>) => {
          state.CategoriesnamesandIds.loading = false;
          state.CategoriesnamesandIds.error = '';
          state.CategoriesnamesandIds.data = action.payload;
        }
      )
      .addCase(getCategoriesNamesandIds.rejected, (state, action) => {
        state.CategoriesnamesandIds.loading = false;
        state.CategoriesnamesandIds.error = action.payload as string;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export default categorySlice.reducer;
