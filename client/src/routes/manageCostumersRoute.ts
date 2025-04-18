import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root.tsx';
import ManageCostumers from '../pages/Admin/managecostumers.tsx';

export const ManageCostumersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'ManageCostumers',
  component: ManageCostumers,
});
