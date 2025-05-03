import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Box)(() => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '24px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  margin: '10px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const CustomArrow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));