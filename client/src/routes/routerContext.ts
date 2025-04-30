export interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
  };
}
  