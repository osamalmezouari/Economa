import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import OrderSummary from '../layouts/orderSummary';

export const placeOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/placeOrder',
  component: OrderSummary,
});
