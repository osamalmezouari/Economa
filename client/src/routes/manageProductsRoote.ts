import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root.tsx';
import ManageProducts from '../pages/Admin/manageproducts.tsx';

export const ManageProductsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'ManageProducts',
  component: ManageProducts,
});
