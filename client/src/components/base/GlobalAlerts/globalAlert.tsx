import { Alert, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useEffect, useState } from 'react';

const GlobalAlert = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cart = useSelector(
    (state: RootState) => state.shoppingCart.createshoppingCart.data
  );
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.createWishList.data
  );

  useEffect(() => {
    if (cart || wishlist) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wishlist, cart]);

  return (
    <>
      {open && (
        <Box className="flex w-full ml-auto">
          <Alert
            className="fixed top-5 right-5 z-[100] rounded capitalize"
            severity="success"
          >
            The product has been successfully added
          </Alert>
        </Box>
      )}
    </>
  );
};

export default GlobalAlert;
