

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
    error: string 
    data: string;
  };
  Register: {
    loading: boolean;
    error: string
    data: RegisterPayload[];
  };
}
