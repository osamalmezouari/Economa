import { AddReview } from '../types/review';
import { apiClient } from '../utils/apiClient';

export const addreview = async (review: AddReview) => {
  try {
    const response = await apiClient.post(`products/addReview`, review);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error(`Failed to Add Review`);
  }
};
