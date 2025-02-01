import { createRoute } from '@tanstack/react-router';
import LoginComponent from '../pages/auth/login';
import RegisterComponent from '../pages/auth/register';
import { mainRoute } from './__root';

export const LoginRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/login',
  component: LoginComponent,
});

export const RegisterRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/Register',
  component: RegisterComponent,
});
