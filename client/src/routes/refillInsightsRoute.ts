import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root';
import RefillInsights from '../pages/dashboard/Admin/refillInsights';

export const RefillInsightsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'RefillInsights',
  component: RefillInsights,
});
