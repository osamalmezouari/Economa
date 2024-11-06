import { Button } from '@mui/material';
import ThemeProvider from './theme';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Button>
            Click Me
        </Button>
      </ThemeProvider>

    </>
  );
}
