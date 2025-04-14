import { apiClient } from '../utils/apiClient';
export const getRoles = async () => {
  try {
    const response = await apiClient.get('/roles');
    return response.data;
  } catch (error) {
    throw error;
  }
};