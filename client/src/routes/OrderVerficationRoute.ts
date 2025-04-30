import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root';
import OrderVerification from '../components/admin/extra/orderVerification/OrderVerification';

export const OrderVerficationRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/OrderVerification',
  component: OrderVerification,
});
