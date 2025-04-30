import { createRoute } from '@tanstack/react-router';
import { UserRoute } from './__root';
import MakeTransferPage from '../pages/User/makeTransfer';

export const MakeTransferRoute = createRoute({
  getParentRoute: () => UserRoute,
  path: 'Make Transfers',
  component: MakeTransferPage,
});
