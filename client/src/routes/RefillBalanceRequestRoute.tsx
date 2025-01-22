import { createRoute } from '@tanstack/react-router';
import RefillBalanceRequestPage from '../pages/refillBalanceRequestPage';
import { rootRoute } from './__root';

export const RefillBalanceRequestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'Refill_Balance',
  component: RefillBalanceRequestPage,
});
