import React from 'react';
import useAuth from '../../hooks/useAuth';

const AuthProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return false
  }

  return <>{children}</>;
};

export default AuthProtectedRoute;
