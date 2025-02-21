import { createRoute } from '@tanstack/react-router';
import RefillBalanceRequestPage from '../pages/refillBalanceRequestPage';
import { mainRoute } from './__root';

export const RefillBalanceRequestRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'Refill_Balance',
  component: RefillBalanceRequestPage,
});
