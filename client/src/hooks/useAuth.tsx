import { useState, useEffect } from 'react';
import { VerifyToken } from '../../src/api/auth';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const verified = await VerifyToken(); 
        setIsAuthenticated(verified); 
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
