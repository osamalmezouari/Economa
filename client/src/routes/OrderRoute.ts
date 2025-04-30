import { createRoute } from '@tanstack/react-router';
import {  UserRoute } from './__root';
import OrdersPage from '../pages/User/orders';

export const OrdersRoute = createRoute({
  getParentRoute: () => UserRoute,
  path: 'My Orders',
  component: OrdersPage,
});
