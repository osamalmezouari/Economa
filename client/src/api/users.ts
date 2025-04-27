import { apiClient } from '../utils/apiClient';

export const getUser = async () => {
  try {
    const response = await apiClient.get(`/user/StoredUserFromToken`);
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

export const adminCreate = async (userData: FormData) => {
  try {
    const response = await apiClient.post('/user/adminCreate', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    throw new Error('Failed to create user');
  }
};

export const adminUpdate = async (id: string, userData: FormData) => {
  try {
    const response = await apiClient.patch(
      `/user/adminUpdate/${id}`,
      userData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    throw new Error('Failed to update user');
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    throw new Error('Failed to fetch user');
  }
};

export const ProfileUpdate = async (userData: FormData) => {
  try {
    const response = await apiClient.patch(`/user/ProfileUpdate`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    throw new Error('Failed to update user');
  }
};
