import { createRoute } from '@tanstack/react-router';
import LoginComponent from '../pages/auth/login';
import RegisterComponent from '../pages/auth/register';
import { rootRoute } from './__root';

export const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginComponent,
});

export const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/Register',
  component: RegisterComponent,
});
