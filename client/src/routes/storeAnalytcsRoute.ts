import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root';
import StoreAnalytics from '../pages/dashboard/Admin/storeAnalytics';

export const StoreAnalyticsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/',
  component: StoreAnalytics,
});

