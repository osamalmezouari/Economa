import ThemeProvider from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/__root';

export default function App() {

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
