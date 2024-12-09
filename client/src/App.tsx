import Landing from './pages/landing';
import ThemeProvider from './theme';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    </ThemeProvider>
  );
}
