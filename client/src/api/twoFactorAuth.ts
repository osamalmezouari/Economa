import { apiClient } from '../utils/apiClient';

/**
 * Generate a QR code for setting up 2FA
 * @returns Promise with the QR code data URL and secret
 */
export const generateTwoFactorAuth = async () => {
  try {
    const response = await apiClient.get('/auth/2fa/generate');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to generate 2FA QR code');
  }
};

/**
 * Verify a 2FA token
 * @param token The 6-digit token to verify
 * @returns Promise with verification result
 */
export const verifyTwoFactorAuth = async (token: string) => {
  try {
    const response = await apiClient.post('/auth/2fa/verify', { token });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to verify 2FA token');
  }
};

/**
 * Enable 2FA for the current user
 * @param token The 6-digit token to verify before enabling
 * @returns Promise with enabling result
 */
export const enableTwoFactorAuth = async (token: string) => {
  try {
    const response = await apiClient.post('/auth/2fa/enable', { token });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to enable 2FA');
  }
};

/**
 * Disable 2FA for the current user
 * @returns Promise with disabling result
 */
export const disableTwoFactorAuth = async () => {
  try {
    const response = await apiClient.post('/auth/2fa/disable');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to disable 2FA');
  }
};

/**
 * Check if 2FA is enabled for the current user
 * @returns Promise with 2FA status
 */
export const getTwoFactorAuthStatus = async () => {
  try {
    const response = await apiClient.get('/auth/2fa/status');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to check 2FA status');
  }
};