import { createRoute } from '@tanstack/react-router';
import {  UserRoute } from './__root';
import Refills from '../pages/User/Refills';

export const RefillsRoute = createRoute({
  getParentRoute: () => UserRoute,
  path: 'My Refills',
  component: Refills,
});
