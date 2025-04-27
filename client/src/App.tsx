import ThemeProvider from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/__root';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterSetup />
      </AuthProvider>
    </ThemeProvider>
  );
}

// This component uses the auth context and passes it to the router
function RouterSetup() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ isAuthenticated: auth.isAuthenticated, auth }} />;
}
