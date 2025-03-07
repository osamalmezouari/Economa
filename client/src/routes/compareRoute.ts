import { createRoute } from '@tanstack/react-router';
import { mainRoute } from './__root';
import Compare from '../components/extra/compare';

export const compareRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'compare',
  component: Compare,
});
