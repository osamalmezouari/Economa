import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import Footer from '../components/extra/footer.tsx';
import { LoginRoute, RegisterRoute } from './authRoute.ts';
import { indexRoute } from './landingRoute.ts';
import { compareRoute } from './compareRoute.ts';
import { StoreRoute } from './storeRoute.ts';
import Wishlist from '../components/extra/wishlist.tsx';
import ShoppingCart from '../components/extra/shoopingCart.tsx';
import { productdetailsRoute } from './productdetailsRoute.ts';
import { RefillBalanceRequestRoute } from './RefillBalanceRequestRoute.ts';
import { OrderRoute } from './placeOrderRoute.ts';
import { OverviewRoute } from './overviewRoute.ts';
import Sidebar from '../components/admin/extra/sidebar/sideBar.tsx';
import { Box } from '@mui/material';
import { StoreAnalyticsRoute } from './storeAnalytcsRoute.ts';
import { RefillInsightsRoute } from './refillInsightsRoute.ts';
import GlobalAlert from '../components/base/globalAlert.tsx';
import Navbar from '../components/extra/Navbar.tsx';
import { ManageProductsRoute } from './manageProductsRoote.ts';
import Header from '../components/admin/extra/header.tsx';
import AddProductDialog from '../components/admin/extra/addproduct.tsx';

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
          <AddProductDialog />
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
  productdetailsRoute,
  RefillBalanceRequestRoute,
  OrderRoute,
  OverviewRoute,
  RefillInsightsRoute,
  StoreAnalyticsRoute,
  ManageProductsRoute,
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
