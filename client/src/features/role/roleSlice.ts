import { createSlice } from '@reduxjs/toolkit';
import { RoleState } from '../../types/role';
import {
  createRole,
  getRolesList,
  getRolesWithUsers,
  getPermissions,
  getRoleById,
  updateRole,
  getRolePermissions,
  updateRolePermissions,
} from './roleThunk';

const initialState: RoleState = {
  roles: {
    data: [],
    loading: false,
    error: null,
  },
  rolesWithUsers: {
    data: [],
    loading: false,
    error: null,
  },
  CreateRole: {
    data: {
      id: '',
      name: '',
      description: '',
    },
    loading: false,
    error: '',
  },
  permissions: {
    data: [],
    loading: false,
    error: null,
  },
  roleById: {
    data: {
      id: '',
      name: '',
      description: ''
    },
    loading: false,
    error: null
  },
  updateRole: {
    data: {
      id: '',
      name: '',
      description: ''
    },
    loading: false,
    error: null
  },
  rolePermissions: {
    data: [],
    loading: false,
    error: null
  },
  updateRolePermissions: {
    loading: false,
    error: null
  },
  roleToEditId: '',
  isEditRoleOpen: false,
  openAddRoleDialog: false,
  isRightDialogOpen: false,
  roleToManagePermissions: '',
  selectedPermissions: []
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    openAddRoleDialog: (state) => {
      state.openAddRoleDialog = true;
    },
    closeAddRoleDialog: (state) => {
      state.openAddRoleDialog = false;
    },
    openEditRoleDialog: (state) => {
      state.isEditRoleOpen = true;
    },
    closeEditRoleDialog: (state) => {
      state.isEditRoleOpen = false;
    },
    setRoleToEdit: (state, action) => {
      state.roleToEditId = action.payload;
    },
    openRightDialog: (state) => {
      state.isRightDialogOpen = true;
    },
    closeRightDialog: (state) => {
      state.isRightDialogOpen = false;
    },
    setRoleToManagePermissions: (state, action) => {
      state.roleToManagePermissions = action.payload;
    },
    setSelectedPermissions: (state, action) => {
      state.selectedPermissions = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Role Permissions
    builder
      .addCase(updateRolePermissions.pending, (state) => {
        state.updateRolePermissions.loading = true;
        state.updateRolePermissions.error = null;
      })
      .addCase(updateRolePermissions.fulfilled, (state) => {
        state.updateRolePermissions.loading = false;
        state.updateRolePermissions.error = null;
      })
      .addCase(updateRolePermissions.rejected, (state, action) => {
        state.updateRolePermissions.loading = false;
        state.updateRolePermissions.error = action.payload as string;
      })
      .addCase(getRolePermissions.pending, (state) => {
        state.rolePermissions.loading = true;
        state.rolePermissions.error = null;
      })
      .addCase(getRolePermissions.fulfilled, (state, action) => {
        state.rolePermissions.loading = false;
        state.rolePermissions.data = action.payload;
        state.rolePermissions.error = null;
      })
      .addCase(getRolePermissions.rejected, (state, action) => {
        state.rolePermissions.loading = false;
        state.rolePermissions.error = action.payload as string;
      });


    builder
      .addCase(getRolesList.pending, (state) => {
        state.roles.loading = true;
        state.roles.error = null;
      })
      .addCase(getRolesList.fulfilled, (state, action) => {
        state.roles.loading = false;
        state.roles.data = action.payload;
        state.roles.error = null;
      })
      .addCase(getRolesList.rejected, (state, action) => {
        state.roles.loading = false;
        state.roles.error = action.payload as string;
      })
      .addCase(getRolesWithUsers.pending, (state) => {
        state.rolesWithUsers.loading = true;
        state.rolesWithUsers.error = null;
      })
      .addCase(getRolesWithUsers.fulfilled, (state, action) => {
        state.rolesWithUsers.loading = false;
        state.rolesWithUsers.data = action.payload;
        state.rolesWithUsers.error = null;
      })
      .addCase(getRolesWithUsers.rejected, (state, action) => {
        state.rolesWithUsers.loading = false;
        state.rolesWithUsers.error = action.payload as string;
      })
      .addCase(createRole.pending, (state) => {
        state.CreateRole.loading = true;
        state.CreateRole.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.CreateRole.loading = false;
        state.roles.data = action.payload;
        state.openAddRoleDialog = false;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.CreateRole.loading = false;
        state.CreateRole.error = action.payload as string;
      })
      .addCase(getPermissions.pending, (state) => {
        state.permissions.loading = true;
        state.permissions.error = null;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.permissions.loading = false;
        state.permissions.data = action.payload;
        state.permissions.error = null;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.permissions.loading = false;
        state.permissions.error =
          (action.payload as string) || 'Failed to fetch permissions';
      })
      .addCase(getRoleById.pending, (state) => {
        state.roleById.loading = true;
        state.roleById.error = null;
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.roleById.loading = false;
        state.roleById.data = action.payload;
        state.roleById.error = null;
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.roleById.loading = false;
        state.roleById.error = action.payload as string;
      })
      .addCase(updateRole.pending, (state) => {
        state.updateRole.loading = true;
        state.updateRole.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.updateRole.loading = false;
        state.updateRole.data = action.payload;
        state.updateRole.error = null;
        state.isEditRoleOpen = false;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.updateRole.loading = false;
        state.updateRole.error = action.payload as string;
      })
  },
});

export const { 
  openAddRoleDialog, 
  closeAddRoleDialog, 
  openEditRoleDialog, 
  closeEditRoleDialog, 
  setRoleToEdit,
  openRightDialog,
  closeRightDialog,
  setRoleToManagePermissions,
  setSelectedPermissions
} = roleSlice.actions;

export const RolesReducer = roleSlice.reducer;
export default roleSlice.reducer;
