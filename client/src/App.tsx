import ThemeProvider from './theme';
import { BrowserRouter } from 'react-router-dom';
import Compare from './components/extra/compare/compare';
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Compare />
      </BrowserRouter>
    </ThemeProvider>
  );
}
