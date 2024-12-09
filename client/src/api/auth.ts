import { LoginPayload, RegisterPayload } from '../interfaces/auth';
import { apiClient } from '../utils/apiClient';

export const Login = async (data: LoginPayload) => {
  try {
    const response = await apiClient.post('/auth/Login', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const Register = async (data: RegisterPayload) => {
  try {
    const response = await apiClient.post('/auth/Register', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register');
  }
};