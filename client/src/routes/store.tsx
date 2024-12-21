import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Store from './../pages/store';

export const StoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'Store',
  component: Store,
});

