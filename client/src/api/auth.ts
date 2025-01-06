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

export const VerifyToken = async (): Promise<boolean> => {
  try {
    const response = await apiClient.post('/auth/verifyToken');
    return response.data.isValid; 
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};
