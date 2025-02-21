import { createRoute } from '@tanstack/react-router';
import { mainRoute } from './__root';
import Landing from '../pages/landing';

export const indexRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/',
  component: Landing,
});
