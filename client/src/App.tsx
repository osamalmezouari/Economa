import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Landing from './pages/landing';
import ThemeProvider from './theme';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </ThemeProvider>
  );
}
