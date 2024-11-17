import { createAsyncThunk } from '@reduxjs/toolkit';
import * as categoryApi from '../../api/category';
import { CategoryType } from '../../interfaces/category';

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (_, { rejectWithValue }) => {
        try {
            const categories = await categoryApi.getCategory();
            return categories;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch categories');
        }
    }
);

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (categoryData: CategoryType, { rejectWithValue }) => {
        try {
            const newCategory = await categoryApi.createCategory(categoryData);
            return newCategory;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create category');
        }
    }
);

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ categoryData, id }: { categoryData: CategoryType; id: string }, { rejectWithValue }) => {
        try {
            const updatedCategory = await categoryApi.updateCategory(categoryData, id);
            return updatedCategory;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update category');
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id: string, { rejectWithValue }) => {
        try {
            const deletedCategory = await categoryApi.deleteCategory(id);
            return deletedCategory;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete category');
        }
    }
);
