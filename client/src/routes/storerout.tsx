import { createRoute } from '@tanstack/react-router';
import { mainRoute } from './__root';
import Store from './../pages/store';

export const StoreRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'Store',
  component: Store,
});

