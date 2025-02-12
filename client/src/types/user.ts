
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
  roleId: String;
}

export interface ShoortedUserInfo {
  name: string;
  email: string;
}

export interface userStateType {
  ShoortedUserInfo: {
    data: ShoortedUserInfo;
    loading: boolean;
    error:string;
  };
}
