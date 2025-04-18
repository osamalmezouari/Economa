import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root';

import PaymentsTransactions from '../pages/Admin/paymentsTransactions';

export const PaymentsTransactionsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'PaymentsTransactions',
  component: PaymentsTransactions,
});
