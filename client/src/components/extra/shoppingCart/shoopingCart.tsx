import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingCartItemProps } from '../../base/shoppingCartItem/interface';
import { useEffect } from 'react';
import { getshoppingCart } from '../../../features/shoppingCart/shoppingCartThunk';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';
import ShoppingCartItem from '../../base/shoppingCartItem/shoppingCartItem';
import EmptyBox from '../../base/empty-box/empty-box';

const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.shoppingCart.shoppingCartWithProducts
  );
  const { basePrice, vat, totalPrice, open } = useSelector(
    (state: RootState) => state.shoppingCart
  );
  const cartItems: shoppingCartItemProps[] = data;
  useEffect(() => {
    dispatch(getshoppingCart());
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        width: '460px',
      }}
      className={`bg-white z-[100] top-0 fixed p-4 right-0 transition-all duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
          className="h-8 items-center "
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            className="text-secondary-main"
          >
            My Cart
          </Typography>
          <button>
            <Cancel
              className="w-16 h-16 cursor-pointer  text-red-500 "
              onClick={() => {
                dispatch({
                  type: 'wishlist/setDisplayWishlist',
                  payload: false,
                });
                dispatch(setDisplayCart());
              }}
            />
          </button>
        </Box>
        <Box
          className={`h-[400px] overflow-y-scroll px-4 ${(loading || error) && 'flex items-center justify-center'} `}
        >
          {loading && <CircularProgress color="primary" className="m-auto" />}
          {!cartItems.length && !loading && <EmptyBox />}
          {!loading &&
            !error &&
            cartItems.map((item) => {
              return (
                <>
                  <ShoppingCartItem
                    productName={item.productName}
                    productPrice={item.productPrice}
                    productunit={item.productunit}
                    svgLink={item.svgLink}
                    quantity={item.quantity}
                    id={item.id}
                    productId={item.productId}
                    key={item.productId}
                  />
                </>
              );
            })}
        </Box>
      </Box>

      {!loading && !error && (
        <Box>
          <Divider sx={{ my: 2 }} />
          <Table>
            <TableBody>
              <TableRow className='items-center !flex justify-between p-2'>
                <Typography
                variant='h6'
                  sx={{
                    fontWeight: 'bold',
                    color: 'secondary.main',
                    fontSize: '18px',
                  }}
                >
                  Base price :{' '}
                </Typography>
                <Typography align="right" sx={{ fontWeight: 'bold' }}>
                  ${basePrice?.toFixed(2)}
                </Typography>
              </TableRow>
              <TableRow className='items-center !flex justify-between p-2'>
                <Typography
                                variant='h6'

                  sx={{
                    fontWeight: 'bold',
                    color: 'secondary.main',
                    fontSize: '18px',
                  }}
                >
                  VAT (20%) :
                </Typography>
                <Typography align="right" sx={{ fontWeight: 'bold' }}>
                  ${vat?.toFixed(2)}
                </Typography>
              </TableRow>
              <TableRow className='items-center !flex justify-between p-2'>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: 'secondary.main',
                    fontSize: '18px',
                  }}
                  variant='h6'

                >
                  Total :
                </Typography>
                <Typography
                  align="right"
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  ${totalPrice?.toFixed(2)}
                </Typography>
              </TableRow>
            </TableBody>
          </Table>

          <Button
            variant="contained"
            className={'tracking-widest'}
            sx={{
              width: '100%',
              backgroundColor: 'secondary.main',
              '&:hover': { backgroundColor: 'primary.main' },
            }}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ShoppingCart;
