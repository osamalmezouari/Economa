import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root.tsx';
import ProductDetailsPage from '../pages/productDetailsPage.tsx';

export const productdetailsroot = createRoute({
  getParentRoute: () => rootRoute,
  path: 'Store/$ProductId',
  component: ProductDetailsPage,
});
