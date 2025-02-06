import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root';
import Overview from '../pages/dashboard/Admin/storeAnalytics';

export const OverviewRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'Overview',
  component: Overview,
});
