import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';
import { CategoryType } from '../../interfaces/category';

export const fetchCategory = createAsyncThunk<CategoryType[]>(
    'category',
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get('/category');
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to fetch categories'
            );
        }
    }
);
