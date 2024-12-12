import ThemeProvider from './theme';
import { BrowserRouter } from 'react-router-dom';
import Landing from './pages/landing';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    </ThemeProvider>
  );
}
