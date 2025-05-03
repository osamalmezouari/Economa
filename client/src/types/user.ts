export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  avatar: string;
  roleId: String;
}

export interface UserWithRoleLvl {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  roleId: String;
  avatar: string;
  role: {
    rolelvl: number;
  };
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  roleId: string;
  avatar: string;
  role: {
    name?: string;
  };
  balance: {
    Balance: number;
  };
}

export interface createUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  roleId: string;
  file?: File | null;
}

export interface updateUser {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  roleId?: string;
  file?: File | null;
}

export interface userStateType {
  ShoortedUserInfo: {
    data: UserWithRoleLvl;
    loading: boolean;
    error: string;
  };

  UserDetails: {
    data: {
      users: UserDetails[];
      pageCount: number;
    };
    loading: boolean;
    error: string;
  };
  getUserById: {
    data: UserDetails;
    loading: boolean;
    error: string;
  };
  createUser: {
    data: createUser;
    loading: boolean;
    error: string;
  };
  updateUser: {
    data: updateUser;
    loading: boolean;
    error: string;
  };
  ProfileUpdate : {
    data : User,
    loading : boolean,
    error : string
  }
  userToEditId: string;
  isEditUserOpen: boolean;
  isAddUserOpen: boolean;
}
