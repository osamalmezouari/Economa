import ThemeProvider from './theme';
import { BrowserRouter } from 'react-router-dom';
import Landing from './pages/landing';
import Compare from './components/extra/compare/compare';
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    </ThemeProvider>
  );
}
