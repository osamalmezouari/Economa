import { apiClient } from '../utils/apiClient';
import { CategoryType } from '../types/category';

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
