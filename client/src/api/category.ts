import { apiClient } from '../utils/apiClient';
import { CategoriesnamesandIds, CategoryType } from '../types/category';

export const CategoryList = async (page: number): Promise<CategoryType[]> => {
  try {
    const response = await apiClient.get<CategoryType[]>(
      `/category?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Category');
  }
};

export const CategoryCards = async (): Promise<CategoryType[]> => {
  try {
    const response = await apiClient.get<CategoryType[]>('/category/cards');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Category Cards');
  }
};

export const getCategoriesNamesandIds = async (): Promise<
  CategoriesnamesandIds[]
> => {
  try {
    const response = await apiClient.get<CategoriesnamesandIds[]>(
      '/category/CategoriesNamesandIds'
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Fetch Category');
  }
};

export const AddCategory = async (
  category: FormData
): Promise<CategoryType> => {
  try {
    const response = await apiClient.post('/category', category);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Add Category');
  }
};

export const updateCategory = async (
  category: FormData
): Promise<CategoryType> => {
  try {
    const response = await apiClient.patch('/category', category);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to Add Category');
  }
};
