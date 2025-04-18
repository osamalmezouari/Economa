import { CreateRoleData, UpdateRoleData } from '../types/role';
import { apiClient } from '../utils/apiClient';

export const getRoles = async () => {
  try {
    const response = await apiClient.get('/roles');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to fetch roles');
  }
};

export const getRolesWithUsers = async () => {
  try {
    const response = await apiClient.get('/roles/with-users');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to fetch roles with users');
  }
};

export const getPermissions = async () => {
  try {
    const response = await apiClient.get('/permissions');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to fetch permissions');
  }
};



export const createRole = async (roleData: CreateRoleData) => {
  try {
    const response = await apiClient.post('/roles', roleData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to create role');
  }
};

export const getRoleById = async (roleId: string) => {
  try {
    const response = await apiClient.get(`/roles/${roleId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to fetch role');
  }
};

export const updateRole = async (roleId: string, roleData: UpdateRoleData) => {
  try {
    const response = await apiClient.patch(`/roles/${roleId}`, roleData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to update role');
  }
};

export const updateRolePermissions = async (roleId: string, permissionIds: string[]) => {
  try {
    const response = await apiClient.patch(`/roles/${roleId}/permissions`, { permissionIds });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to update role permissions');
  }
};

export const getRolePermissions = async (roleId: string) => {
  try {
    const response = await apiClient.get(`/roles/${roleId}/permissions`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to fetch role permissions');
  }
};

