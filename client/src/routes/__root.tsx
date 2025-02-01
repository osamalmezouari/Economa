import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
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
import Header from '../components/dashboards/shared/header/header.tsx';
import { OverviewRoute } from './overviewRoute.tsx';

// Define the root route
export const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}

// Define the main route
export const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/Economa',
  component: MainComponent,
});

function MainComponent() {
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

// Define the admin route
export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'Economa/Admin/Dashboard',
  component: AdminRoute,
});

function AdminRoute() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

// Create the route tree
const routeTree = rootRoute.addChildren([
  mainRoute,
  adminRoute,
  RegisterRoute,
  LoginRoute,
  indexRoute,
  compareRoute,
  StoreRoute,
  productdetailsroot,
  RefillBalanceRequestRoute,
  OrderRoute,
  OverviewRoute,
]);

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register the router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
