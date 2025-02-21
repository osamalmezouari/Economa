import { createRoute } from '@tanstack/react-router';
import { mainRoute } from './__root.tsx';
import ProductDetailsPage from '../pages/productDetailsPage.tsx';

export const productdetailsRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'Store/$ProductId',
  component: ProductDetailsPage,
});
