import { createRoute } from '@tanstack/react-router';
import { mainRoute } from './__root';
import Order from '../pages/order';

export const OrderRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/placeOrder',
  component: Order,
});
