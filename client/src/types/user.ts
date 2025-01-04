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
