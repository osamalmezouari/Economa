import {
  Box,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { AppDispatch } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { shoppingCartItemProps } from '../../base/shoppingCartItem/interface';
import { useEffect } from 'react';
import { getshoppingCart } from '../../../features/shoppingCart/shoppingCartThunk';
import { ApiError } from '../../../types/error';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';
import ShoppingCartItem from '../../base/shoppingCartItem/shoppingCartItem';

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
      className={`bg-white z-[100] fixed p-4 right-0 transition-all duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
          className="h-8 items-center "
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            className="text-secondary-main "
          >
            My Cart
          </Typography>
          <button onClick={() => console.log('hello')}>
            <Cancel
              className="w-16 h-16 cursor-pointer  text-red-500 font"
              onClick={() => dispatch(setDisplayCart())}
            />
          </button>
        </Box>
        <Box
          className={`h-[400px] overflow-y-scroll px-4 ${(loading || error) && 'flex items-center justify-center'} `}
        >
          {loading && <CircularProgress color="primary" className="m-auto" />}
          {(error as ApiError) && (
            <Alert severity="warning">{(error as ApiError).message}</Alert>
          )}
          {!loading &&
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
                  />
                </>
              );
            })}
        </Box>
      </Box>

      <Box>
        <Divider sx={{ my: 2 }} />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  fontSize: '18px',
                }}
              >
                Base price :{' '}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                ${basePrice?.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  fontSize: '18px',
                }}
              >
                VAT (20%) :
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                ${vat?.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  fontSize: '18px',
                }}
              >
                Total :
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                ${totalPrice?.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: 'secondary.main',
            '&:hover': { backgroundColor: 'primary.main' },
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
