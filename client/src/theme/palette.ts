import { alpha } from '@mui/material/styles';

// Color definitions
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#A5E1B7', // Light version of #5CAF90
  light: '#79D89E',   // Lighter green for backgrounds
  main: '#5CAF90',    // Main green from the website
  dark: '#4D9F7A',    // Darker green for hover or active states
  darker: '#3D815C',  // Very dark green for borders or text
  contrastText: '#fff', // White text for contrast
};

const SECONDARY = {
  lighter: '#A0B2B9', // Light version of #4B5966
  light: '#7C8C94',    // Lighter shade
  main: '#4B5966',     // Main color from the website
  dark: '#3C474E',     // Darker shade for hover or active
  darker: '#2C353C',   // Very dark for borders or text
  contrastText: '#fff', // White text for contrast
};

const SUCCESS = {
  lighter: '#D8FBDE', // Lighter green
  light: '#86E8AB',   // Lighter success
  main: '#36B37E',    // Main success green
  dark: '#1B806A',    // Dark success
  darker: '#0A5554',  // Very dark success
  contrastText: '#fff', // White text
};

const INFO = {
  lighter: '#CAFDF5', // Light info color
  light: '#61F3F3',   // Light info color for accents
  main: '#00B8D9',    // Main info color (blue)
  dark: '#006C9C',    // Darker info
  darker: '#003768',  // Very dark info
  contrastText: '#fff', // White text
};

const ERROR = {
  lighter: '#FFE9D5', // Lighter red
  light: '#FFAC82',   // Light error color
  main: '#FF5630',    // Main error color (red)
  dark: '#B71D18',    // Darker error
  darker: '#7A0916',  // Very dark error
  contrastText: '#fff', // White text
};

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: '#fff',
};
const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  success: SUCCESS,
  info: INFO,
  error: ERROR,
  warning : WARNING,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

// MUI theme palette for light and dark modes
export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === 'light' ? light : dark;
}
