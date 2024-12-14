import { apiClient } from '../utils/apiClient';

export const getComparedProductDetails = async (ids: string[]) => {
  try {
    const idString = ids.join(',');
    const response = await apiClient.get(
      `/products/ComparedProductDetails/${idString}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch compare items data');
  }
};
