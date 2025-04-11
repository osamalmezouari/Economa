import { apiClient } from '../utils/apiClient';

export const getUser = async () => {
  try {
    const response = await apiClient.get(`/user/byEmail`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    throw new error(`Somthing goes wrrong`);
  }
};

export const getUsersList = async (page: number, search: string) => {
  try {
    const response = await apiClient.get(
      `/user/list?page=${page}&search=${search}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    throw new error(`Somthing goes wrrong`);
  }
};
