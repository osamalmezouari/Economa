import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompareStateType, CompareType } from '../../types/compare';
import { getComparedProductDetails } from './compareThunk';

const initialState: CompareStateType = {
  data: [],
  compareItemsIds: [],
  loading: false,
  error: null,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addCompareItem: (state, action: PayloadAction<string>) => {
      const storedIds = localStorage.getItem('compareItemsIds');
      state.compareItemsIds = storedIds ? JSON.parse(storedIds) : [];
      if (!state.compareItemsIds.includes(action.payload)) {
        state.compareItemsIds.push(action.payload);
        localStorage.setItem(
          'compareItemsIds',
          JSON.stringify(state.compareItemsIds)
        );
      }
    },
    removeCompareItem: (state, action: PayloadAction<string>) => {
      console.log('recivedId', action.payload);
      const updatedCompareItemsIds = state.compareItemsIds.filter(
        (productId) => productId !== action.payload
      );
      state.compareItemsIds = updatedCompareItemsIds;
      localStorage.setItem(
        'compareItemsIds',
        JSON.stringify(state.compareItemsIds)
      );
      state.data = state.data.filter(
        (product) => product.productId !== action.payload
      );
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComparedProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getComparedProductDetails.fulfilled,
        (state, action: PayloadAction<CompareType[]>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(
        getComparedProductDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default compareSlice.reducer;
export const compareReducer = compareSlice.reducer;
export const { addCompareItem, removeCompareItem } = compareSlice.actions;
