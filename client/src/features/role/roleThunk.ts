import { createAsyncThunk } from '@reduxjs/toolkit';
import * as roleApi from '../../api/role';
import { CreateRoleData, UpdateRoleData } from '../../types/role';

export const getRolesList = createAsyncThunk(
  'role/getRolesList',
  async (_, { rejectWithValue }) => {
    try {
      const roles = await roleApi.getRoles();
      return roles;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Failed to fetch roles');
    }
  }
);

export const getRolesWithUsers = createAsyncThunk(
  'role/getRolesWithUsers',
  async (_, { rejectWithValue }) => {
    try {
      const roles = await roleApi.getRolesWithUsers();
      return roles;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Failed to fetch Roles With Users');
    }
  }
);

export const createRole = createAsyncThunk(
  'role/createRole',
  async (roleData: CreateRoleData, { rejectWithValue }) => {
    try {
      const newRole = await roleApi.createRole(roleData);
      return newRole;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Failed to create Role');
    }
  }
);

export const getPermissions = createAsyncThunk(
  'role/getPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const permissions = await roleApi.getPermissions();
      return permissions;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }

      return rejectWithValue('Failed to fetch Permissions');
    }
  }
);

export const getRoleById = createAsyncThunk(
  'role/getRoleById',
  async (roleId: string, { rejectWithValue }) => {
    try {
      const role = await roleApi.getRoleById(roleId);
      return role;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Failed to get Role By Id');
    }
  }
);

export const updateRole = createAsyncThunk(
  'role/updateRole',
  async (
    { roleId, roleData }: { roleId: string; roleData: UpdateRoleData },
    { rejectWithValue }
  ) => {
    try {
      const updatedRole = await roleApi.updateRole(roleId, roleData);
      return updatedRole;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Failed to update Role');
    }
  }
);

export const updateRolePermissions = createAsyncThunk(
  'role/updateRolePermissions',
  async (
    { roleId, permissionIds }: { roleId: string; permissionIds: string[] },
    { rejectWithValue }
  ) => {
    try {
      const updatedRole = await roleApi.updateRolePermissions(
        roleId,
        permissionIds
      );
      return updatedRole;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Failed to update Role Permissions');
    }
  }
);

export const getRolePermissions = createAsyncThunk(
  'role/getRolePermissions',
  async (roleId: string, { rejectWithValue }) => {
    try {
      const permissions = await roleApi.getRolePermissions(roleId);
      return permissions;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue('Failed to get Role Permissions');
    }
  }
);
