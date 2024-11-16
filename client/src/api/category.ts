import { apiClient } from './apiClient';
import { CategoryType } from '../interfaces/category';


export const fetchCategoriesWithProducts = async (): Promise<CategoryType[]> => {
    try {
        const response = await apiClient.get<CategoryType[]>('/category');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories with products');
    }
};
