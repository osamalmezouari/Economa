import { Outlet, createRootRoute, createRouter } from '@tanstack/react-router';
import Navbar from '../components/extra/navbar/Navbar';
import Footer from '../components/extra/footer/footer';
import { LoginRoute, RegisterRoute } from './auth';
import { indexRoute } from './landing';
import { compareRoute } from './compare';
import { StoreRoute } from './store';

export const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
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
]);
export const router = createRouter({ routeTree, defaultPreload: 'intent' });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
