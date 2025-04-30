import { createRoute } from '@tanstack/react-router';
import {  UserRoute } from './__root';
import MakeRefillPage from '../pages/User/makeRefill';

export const MakeRefillRoute = createRoute({
  getParentRoute: () => UserRoute,
  path: 'Make Refills',
  component: MakeRefillPage,
});
