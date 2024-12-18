import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Landing from '../pages/landing';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});
