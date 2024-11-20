import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productsApi from '../../api/products';

export const getproductsCards = createAsyncThunk(
    '/products/getcards', async (_, { rejectWithValue }) => {
        try {
            const products = await productsApi.getProductsCards()
            return products
        }
        catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch products Cards');
        }
    }
)