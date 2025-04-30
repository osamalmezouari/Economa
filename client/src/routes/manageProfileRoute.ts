import { createRoute } from '@tanstack/react-router';
import { UserRoute } from './__root.tsx';
import ManageProfile from '../pages/User/manageProfile.tsx';

export const ManageProfileRoute = createRoute({
  getParentRoute: () => UserRoute,
  path: '/',
  component: ManageProfile,
});
