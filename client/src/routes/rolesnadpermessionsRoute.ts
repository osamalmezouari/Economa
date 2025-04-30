import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root.tsx';
import RolesAndPermissions from '../components/admin/extra/costumers/rolesandpermessions/rolesandpermessions';

export const RolesandpermessionsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'RolesAndPermissions',
  component: RolesAndPermissions,
});
