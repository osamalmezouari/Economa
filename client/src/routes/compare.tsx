import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Compare from '../components/extra/compare/compare';

export const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'compare',
  component: Compare,
});
