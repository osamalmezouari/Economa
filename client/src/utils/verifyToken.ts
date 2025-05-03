import { VerifyToken } from '../api/auth';
import { getUser } from '../api/users';

export const isTokenValid = async (): Promise<{
  verfied: boolean;
  rolelvl?: number;
}> => {
  const token = localStorage.getItem('token');
  if (!token)
    return {
      verfied: false,
    };

  try {
    const verified = await VerifyToken();
    if (verified) {
      const userInfo = await getUser();
      return {
        rolelvl: userInfo.role.rolelvl || 3,
        verfied: true,
      };
    }
    return {
      verfied: false,
    };
  } catch (err) {
    console.error('Token verification failed:', err);
    return {
      verfied: false,
    };
  }
};
