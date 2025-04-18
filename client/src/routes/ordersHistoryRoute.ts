import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root';
import OrderHistory from '../pages/Admin/orderHistory';

export const OrderHistoryRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'OrdersHistory',
  component: OrderHistory,
});
