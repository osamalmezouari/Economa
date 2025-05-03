export interface Role {
  id: string;
  name: string;
  description?: string;
  userTotal?: number;
  usersAvatars?: string[];
  rolelvl?: number;
  permissions?: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface CreateRoleData {
  name: string;
  description?: string;
  rolelvl : number
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  rolelvl : number
}



export interface RoleState {
  roles: {
    data: Role[];
    loading: boolean;
    error: null | string;
  };
  rolesWithUsers: {
    data: Role[];
    loading: boolean;
    error: null | string;
  };
  CreateRole: {
    loading: boolean;
    error: null | string;
    data: Role;
  };
  updateRole: {
    loading: boolean;
    error: null | string;
    data: Role | null;
  };
  roleById: {
    loading: boolean;
    error: null | string;
    data: Role;
  };
  permissions: {
    data: Permission[];
    loading: boolean;
    error: null | string;
  };
  rolePermissions: {
    data: Permission[];
    loading: boolean;
    error: null | string;
  };
  updateRolePermissions: {
    loading: boolean;
    error: null | string;
  };
  openAddRoleDialog: boolean;
  isEditRoleOpen: boolean;
  roleToEditId: string;
  isRightDialogOpen: boolean;
  roleToManagePermissions: string;
  selectedPermissions: string[];
}
