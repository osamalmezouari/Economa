 import { alpha } from '@mui/material/styles';

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
   lighter: '#A5E1B7', 
   light: '#79D89E',   
   main: '#5CAF90',    
   dark: '#4D9F7A',    
   darker: '#3D815C',  
   contrastText: '#fff'
 };

 const SECONDARY = {
   lighter: '#A0B2B9',
   light: '#7C8C94',   
   main: '#4B5966',    
   dark: '#3C474E',    
   darker: '#2C353C',  
   contrastText: '#fff'
 };

 const SUCCESS = {
   lighter: '#D8FBDE', 
   light: '#86E8AB',   
   main: '#36B37E',    
   dark: '#1B806A',    
   darker: '#0A5554',  
   contrastText: '#fff'
 };

 const INFO = {
   lighter: '#CAFDF5', 
   light: '#61F3F3',   
   main: '#00B8D9',    
   dark: '#006C9C',    
   darker: '#003768',  
   contrastText: '#fff'
 };

 const ERROR = {
   lighter: '#FFE9D5', 
   light: '#FFAC82',   
   main: '#FF5630',    
   dark: '#B71D18',    
   darker: '#7A0916',  
   contrastText: '#fff'
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
