import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows from "./shadows.ts";
import customShadows from './customShadows.ts';
type Props = {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: palette('light'), // Set a default theme mode
            typography,
            shape: { borderRadius: 8 },
            shadows: shadows('light'),
            customShadows: customShadows('light')
        }),
        []
    );

    const theme = createTheme(themeOptions);

    theme.components = componentsOverride(theme);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}
