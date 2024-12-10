import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryStateType, CategoryType } from '../../types/category';
import { getCategoryCards } from './categoryThunk';

const initialState: CategoryStateType = {
  CategoryCards: {
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
        state.CategoryCards.error = null;
      })
      .addCase(
        getCategoryCards.fulfilled,
        (state, action: PayloadAction<CategoryType[]>) => {
          state.CategoryCards.loading = false;
          state.CategoryCards.error = null;
          state.CategoryCards.data = action.payload;
        }
      )
      .addCase(getCategoryCards.rejected, (state, action) => {
        state.CategoryCards.loading = false;
        state.CategoryCards.error = action.payload;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export default categorySlice.reducer;
