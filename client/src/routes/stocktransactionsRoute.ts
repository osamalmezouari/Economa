import { createRoute } from '@tanstack/react-router';
import { adminRoute } from './__root';
import StockTransaction from '../pages/Admin/stockTransactions';

export const StoreTransactionsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: 'Stock_Transactions',
  component: StockTransaction,
});
