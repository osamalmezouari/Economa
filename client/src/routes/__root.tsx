import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import Navbar from '../components/extra/navbar/Navbar';
import Footer from '../components/extra/footer/footer';
import { LoginRoute, RegisterRoute } from './auth';
import { indexRoute } from './landing';
import { compareRoute } from './compare';
import { StoreRoute } from './storerout.tsx';
import Wishlist from '../components/extra/wishlist/wishlist';
import ShoppingCart from '../components/extra/shoppingCart/shoopingCart';
import GlobalAlert from '../components/base/GlobalAlerts/globalAlert';
import { productdetailsroot } from './productdetailsroot.tsx';
import { RefillBalanceRequestRoute } from './RefillBalanceRequestRoute.tsx';
import { OrderRoute } from './placeOrder.tsx';

export const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <GlobalAlert />
      <ShoppingCart />
      <Wishlist />
      <Outlet />
      <Footer />
    </>
  );
}

const routeTree = rootRoute.addChildren([
  RegisterRoute,
  LoginRoute,
  indexRoute,
  compareRoute,
  StoreRoute,
  productdetailsroot,
  RefillBalanceRequestRoute,
  OrderRoute,
]);
export const router = createRouter({ routeTree, defaultPreload: 'intent' });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
