import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Order from '../pages/order';

export const OrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/placeOrder',
  component: Order,
});
