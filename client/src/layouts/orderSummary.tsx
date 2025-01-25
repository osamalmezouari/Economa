import { Box, Typography, Button, Link, Divider } from '@mui/material';
import EmptyBox from '../components/base/empty-box/empty-box';

const OrderSummary = () => {
  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 1,
        maxWidth: '350px',
        marginX: 'auto',
        marginY: 4,
      }}
      component={'div'}
    >
      <Box className={'flex justify-between py-2 mb-4'}>
        <Typography variant="body2" className='!text-secondary-main capitalize' color="text.secondary.light" >
          Ordered items
        </Typography>
        <Typography className={'!underline'} color='primary.main' variant="body2">
          Edit Cart
        </Typography>
      </Box>
      <Divider />
      <Box className={'flex items-center justify-center py-2'}>
        <EmptyBox />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="body2">Subtotal</Typography>
        <Typography variant="body2">$0.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2">Tax</Typography>
        <Typography variant="body2">$0.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2">Shipping</Typography>
        <Typography variant="body2">$0.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          $0.00
        </Typography>
      </Box>
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        Back to Store
      </Button>
    </Box>
  );
};

export default OrderSummary;
