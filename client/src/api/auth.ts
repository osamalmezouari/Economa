import { LoginPayload, RegisterPayload } from '../types/auth';
import { apiClient } from '../utils/apiClient';

export const Login = async (data: LoginPayload) => {
  try {
    const response = await apiClient.post('/auth/Login', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to login');
  }
};

export const Register = async (data: RegisterPayload) => {
  try {
    const response = await apiClient.post('/auth/Register', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Failed to register');
  }
};
