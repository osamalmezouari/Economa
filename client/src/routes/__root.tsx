import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { isTokenValid } from '../utils/verifyToken';
import { LoginRoute } from './authRoute';
import { indexRoute } from './landingRoute';
import { compareRoute } from './compareRoute';
import { StoreRoute } from './storeRoute';
import Wishlist from '../components/extra/wishlist';
import ShoppingCart from '../components/extra/shoopingCart';
import { productdetailsRoute } from './productdetailsRoute';
import { placeOrderRoute } from './placeOrderRoute';
import { OverviewRoute } from './overviewRoute';
import Sidebar from '../components/extra/sidebar/sideBar';
import { Box } from '@mui/material';
import { StoreAnalyticsRoute } from './storeAnalytcsRoute';
import { RefillInsightsRoute } from './refillInsightsRoute';
import GlobalAlert from '../components/base/globalAlert';
import Navbar from '../components/extra/Navbar';
import { ManageProductsRoute } from './manageProductsRoote';
import Header from '../components/extra/Header/header';
import AddProductDialog from '../components/admin/extra/products/manageProducts/addproduct';
import { StoreTransactionsRoute } from './stocktransactionsRoute';
import { ManageCategoriesRoute } from './managecategoriesRoute';
import AddCategoryDialog from '../components/admin/extra/products/manageCategory/addCategory';
import { ManageRefillsRoute } from './manageRefillsRoute';
import ReactViewer from 'react-viewer';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setVisible } from '../features/common/commonSlice';
import { OrderHistoryRoute } from './ordersHistoryRoute';
import { PaymentsTransactionsRoute } from './paymentsTransactionsRoute';
import { ManageCostumersRoute } from './manageCostumersRoute';
import { RolesandpermessionsRoute } from './rolesnadpermessionsRoute';
import SearchDialog from '../components/extra/Header/SearchDialog';
import { OrderVerficationRoute } from './OrderVerficationRoute';
import { ManageProfileRoute } from './manageProfileRoute';
import { OrdersRoute } from './OrderRoute';
import { RefillsRoute } from './userRefillsRoute';
import { MakeRefillRoute } from './MakeRefillRoute';
import { MakeTransferRoute } from './MakeTransferRoute';
import Footer from '../components/extra/footer';

// --- Root Route ---
export const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}

// --- Main Route ---
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

// --- Admin Route ---
export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'Economa/Admin/Dashboard',
  component: AdminRouteComponent,
  beforeLoad: async () => {
    const { verfied, rolelvl } = await isTokenValid();
    if (!verfied || !rolelvl || rolelvl >= 3) {
      throw redirect({
        to: '/Economa',
        replace: true,
      });
    }
  },
});

function AdminRouteComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { visible, imagePreview } = useSelector(
    (state: RootState) => state.common.imagePreviewState
  );

  return (
    <Box display="flex" flexDirection="row" height="100vh">
      <Box sx={{ width: '288px', flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box p={2} flexGrow={1}>
          <Outlet />
          <AddProductDialog />
          <AddCategoryDialog />
          <ReactViewer
            visible={visible}
            onClose={() => dispatch(setVisible(false))}
            images={[{ src: imagePreview, alt: 'Preview' }]}
          />
          <SearchDialog />
        </Box>
      </Box>
    </Box>
  );
}

// --- User Route ---
export const UserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'Economa/User/Profile',
  component: UserRouteComponent,
  beforeLoad: async () => {
    const { verfied } = await isTokenValid();
    if (!verfied) {
      throw redirect({
        to: '/Economa',
        replace: true,
      });
    }
  },
});

function UserRouteComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { visible, imagePreview } = useSelector(
    (state: RootState) => state.common.imagePreviewState
  );

  return (
    <Box display="flex" flexDirection="row" height="100vh">
      <Box sx={{ width: '288px', flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box p={2} flexGrow={1}>
          <Outlet />
          <ReactViewer
            visible={visible}
            onClose={() => dispatch(setVisible(false))}
            images={[{ src: imagePreview, alt: 'Preview' }]}
          />
          <SearchDialog />
        </Box>
      </Box>
    </Box>
  );
}

// --- Route Tree ---
const routeTree = rootRoute.addChildren([
  mainRoute.addChildren([
    /*     RegisterRoute,
     */ LoginRoute,
    indexRoute,
    compareRoute,
    StoreRoute,
    productdetailsRoute,
    placeOrderRoute,
  ]),
  adminRoute.addChildren([
    OverviewRoute,
    RefillInsightsRoute,
    StoreAnalyticsRoute,
    ManageProductsRoute,
    StoreTransactionsRoute,
    ManageCategoriesRoute,
    ManageRefillsRoute,
    OrderHistoryRoute,
    PaymentsTransactionsRoute,
    ManageCostumersRoute,
    RolesandpermessionsRoute,
    OrderVerficationRoute,
  ]),
  UserRoute.addChildren([
    ManageProfileRoute,
    OrdersRoute,
    RefillsRoute,
    MakeRefillRoute,
    MakeTransferRoute,
  ]),
]);

// --- Router ---
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// --- Type registration ---
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
