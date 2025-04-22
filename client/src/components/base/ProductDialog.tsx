import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Box,
  Rating,
  TextField,
  InputAdornment,
  Button,
  Badge,
  CircularProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { ProductDialogProps } from '../../types/product';
import {
  createshoppingCart,
  getshoppingCart,
} from '../../features/shoppingCart/shoppingCartThunk';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearCreateError } from '../../features/shoppingCart/shoppingCartSlice';
import { useRouter } from '@tanstack/react-router';

export default function ProductDialog({
  open,
  setopen,
  id,
  discount,
  name,
  description,
  productAvgRating,
  price,
  priceWithDiscount,
  unit,
  imageLink,
}: ProductDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const Router = useRouter();
  const quantity = useSelector((state: RootState) => {
    const item = state.shoppingCart.shoppingCartWithProducts.data.find(
      (item) => item.productId === id
    );
    return item ? item.quantity : 1;
  });
  const { loading, error } = useSelector(
    (state: RootState) => state.shoppingCart.createshoppingCart
  );
  const [newquantity, setQuantity] = React.useState(quantity);
  const incrementQuantity = () => {
    setQuantity((prev: number) => prev + 1);
  };
  const decrementQuantity = () => {
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = async () => {
    const cartItem = {
      productId: id,
      quantity: newquantity,
    };
    await dispatch(createshoppingCart(cartItem));
    await dispatch(getshoppingCart());
  };

  return (
    <>
      {' '}
      <Dialog
        className="h-full"
        onClose={async () => {
          dispatch(clearCreateError());
          setopen(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '800px',
            borderRadius: '',
          },
        }}
      >
        <DialogContent
          className="h-full"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '10px',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={async () => {
              await dispatch(clearCreateError());
              setopen(false);
            }}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5.5}>
              <Box
                component={'div'}
                className="relative w-full h-full border-2 bg-green-50 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${imageLink})`,
                }}
              >
                {discount > 0 && (
                  <div className="absolute top-1 right-2">
                    <Badge className="bg-red-400 text-white rounded-sm px-2 uppercase text-[12px]">
                      - {discount} %
                    </Badge>
                  </div>
                )}
                <div className="absolute top-1 left-2">
                  <Badge className="bg-primary-main text-white rounded-sm px-2 uppercase text-[12px]">
                    {unit}
                  </Badge>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="p-4">
              <p
                onClick={() => Router.navigate({ to: `/Economa/Store/${id}` })}
                className="tracking-wide font-normal text-secondary-main text-2xl mt-4 cursor-pointer hover:text-primary-main transition-all duration-300"
              >
                {name}
              </p>
              <Rating
                name="half-rating"
                size="small"
                defaultValue={productAvgRating}
                precision={0.5}
                className="py-2"
              />
              <p className="text-secondary-main py-4">{description}</p>
              <Box className="flex gap-4 text-secondary-main pb-5">
                {priceWithDiscount && priceWithDiscount > 0 && (
                  <p className="text-secondary-main font-extrabold text-2xl">
                    ${priceWithDiscount}
                  </p>
                )}
                <p
                  className={`font-light text-secondary-main text-2xl ${
                    discount > 0 ? 'line-through' : 'hidden'
                  }`}
                >
                  ${price}
                </p>
              </Box>
              {error && <Alert severity="info">{error}</Alert>}

              <DialogActions sx={{ padding: '5px !important' }}>
                <TextField
                  className="w-24 text-secondary-main"
                  value={newquantity}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BiPlus
                          className="hover:cursor-pointer hover:bg-primary-main hover:rounded-full hover:text-white duration-300 transition-all"
                          onClick={incrementQuantity}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <BiMinus
                          className="hover:cursor-pointer hover:bg-primary-main hover:rounded-full hover:text-white duration-300 transition-all"
                          onClick={decrementQuantity}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  className="h-[56px] hover:bg-primary-main w-[150px]"
                  startIcon={<ShoppingBagOutlined />}
                  color="secondary"
                  variant="contained"
                  onClick={addToCart}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={40} color="inherit" />
                  ) : (
                    'Add to Cart'
                  )}
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
