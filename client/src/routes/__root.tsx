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
import Wishlist from '../layouts/wishlist.tsx';
import ShoppingCart from '../layouts/shoopingCart.tsx';
import GlobalAlert from '../components/base/GlobalAlerts/globalAlert';
import { productdetailsroot } from './productdetailsroot.tsx';
import { RefillBalanceRequestRoute } from './RefillBalanceRequestRoute.tsx';
import { OrderRoute } from './placeOrder.tsx';
import Header from '../components/dashboards/shared/header.tsx';
import { OverviewRoute } from './overviewRoute.tsx';
import Sidebar from '../components/dashboards/shared/sidebar/sideBar.tsx';
import { Box } from '@mui/material';
import { StoreAnalyticsRoute } from './storeAnalytcs.tsx';
import { RefillInsightsRoute } from './refillInsights.tsx';

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
    <Box display="flex" flexDirection="row" height="100vh">
      <Box
        sx={{
          width: '288px', // Sidebar width
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box p={2} flexGrow={1}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminRoute;
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
  StoreAnalyticsRoute,
  RefillInsightsRoute,
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
