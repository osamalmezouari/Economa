import ThemeProvider from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/__root';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
