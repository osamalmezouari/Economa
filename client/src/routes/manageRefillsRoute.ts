import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root.tsx';
import ManageRefills from '../pages/Admin/manageRefills.tsx';

export const ManageRefillsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'ManageRefills',
  component: ManageRefills,
});
