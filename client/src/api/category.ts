import { apiClient } from './apiClient';
import { CategoryType } from '../interfaces/category';


export const getCategory = async (): Promise<CategoryType[]> => {
    try {
        const response = await apiClient.get<CategoryType[]>('/category');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories with products');
    }
};


export const createCategory = async (CategoryData: CategoryType): Promise<CategoryType[]> => {
    try {
        const response = await apiClient.post<CategoryType[]>('/category', CategoryData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories with products');
    }
};

export const updateCategory = async (CategoryData: CategoryType, id: string): Promise<CategoryType[]> => {
    try {
        const response = await apiClient.patch(`/category/${id}`, CategoryData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories with products');
    }
};

export const deleteCategory = async ( id: string): Promise<CategoryType[]> => {
    try {
        const response = await apiClient.delete<CategoryType[]>(`/category/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories with products');
    }
};
