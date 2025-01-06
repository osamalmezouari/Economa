import { apiClient } from '../utils/apiClient';

export const getUser = async () => {
  try {
    const response = await apiClient.get(`/user/byEmail`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw new error(`Somthing goes wrrong`);
  }
};
