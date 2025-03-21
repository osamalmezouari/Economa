import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CategoriesnamesandIds,
  CategoryStateType,
  CategoryType,
} from '../../types/category';
import {
  AddCategory,
  getCategoriesNamesandIds,
  getCategoryById,
  getCategoryCards,
  getCategoryList,
  updateCategory,
} from './categoryThunk';

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
  Categories: {
    data: {
      categories: [],
      pageCount: 0,
    },
    loading: false,
    error: '',
  },
  createCategory: {
    data: {
      id: '',
      name: '',
      svgLink: '',
      description: '',
      productsCount: 0,
    },
    loading: false,
    error: '',
  },
  updateCategory: {
    data: {
      id: '',
      name: '',
      svgLink: '',
      description: '',
      productsCount: 0,
    },
    loading: false,
    error: '',
  },
  CategoryById: {
    data: {
      id: '',
      name: '',
      description: '',
    },
    loading: false,
    error: '',
  },
  categorytoEdit: '',
  isUpdateCategoryOpen: false,
  isCreateCategoryOpen: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryToEdit: (state, action: PayloadAction<string>) => {
      state.categorytoEdit = action.payload;
    },
    OpenCreateCategoryDailog: (state) => {
      state.isCreateCategoryOpen = true;
    },
    CloseCreateCategoryDailog: (state) => {
      state.isCreateCategoryOpen = false;
    },
    OpenUpdateCategoryDailog: (state) => {
      state.isUpdateCategoryOpen = true;
    },
    CloseUpdateCategoryDailog: (state) => {
      state.isUpdateCategoryOpen = false;
    },
  },
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
      })

      .addCase(getCategoryList.pending, (state) => {
        state.Categories.loading = true;
        state.Categories.error = '';
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.Categories.loading = false;
        state.Categories.error = '';
        state.Categories.data = action.payload;
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.Categories.loading = false;
        state.Categories.error = action.payload as string;
      })

      .addCase(AddCategory.pending, (state) => {
        state.createCategory.loading = true;
        state.createCategory.error = '';
      })
      .addCase(AddCategory.fulfilled, (state, action) => {
        state.createCategory.loading = false;
        state.createCategory.error = '';
        state.createCategory.data = action.payload;
      })
      .addCase(AddCategory.rejected, (state, action) => {
        state.createCategory.loading = false;
        state.createCategory.error = action.payload as string;
      })

      .addCase(updateCategory.pending, (state) => {
        state.updateCategory.loading = true;
        state.updateCategory.error = '';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateCategory.loading = false;
        state.updateCategory.error = '';
        state.updateCategory.data = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updateCategory.loading = false;
        state.updateCategory.error = action.payload as string;
      })

      .addCase(getCategoryById.pending, (state) => {
        state.CategoryById.loading = true;
        state.CategoryById.error = '';
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.CategoryById.loading = false;
        state.CategoryById.error = '';
        state.CategoryById.data = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.CategoryById.loading = false;
        state.CategoryById.error = action.payload as string;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export default categorySlice.reducer;
export const {
  CloseCreateCategoryDailog,
  OpenCreateCategoryDailog,
  CloseUpdateCategoryDailog,
  OpenUpdateCategoryDailog,
  setCategoryToEdit,
} = categorySlice.actions;
