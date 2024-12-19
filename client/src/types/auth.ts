import { ApiError } from './apierror';

export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface AuthState {
  Login: {
    loading: boolean;
    error: ApiError | null | undefined | unknown;
    data: LoginPayload[];
  };
  Register: {
    loading: boolean;
    error: ApiError | null | undefined | unknown;
    data: RegisterPayload[];
  };
}
