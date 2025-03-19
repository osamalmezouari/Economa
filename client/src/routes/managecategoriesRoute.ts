import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root.tsx';
import ManageCategories from '../pages/Admin/manageCategories.tsx';

export const ManageCategoriesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'ManageCategories',
  component: ManageCategories,
});
