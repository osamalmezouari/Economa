import { ShoppingBagOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { BiHeart, BiMinus, BiPlus } from 'react-icons/bi';
import {
  createshoppingCart,
  getshoppingCart,
} from '../features/shoppingCart/shoppingCartThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import React, { useEffect } from 'react';
import {
  createWishList,
  getWishlist,
} from '../features/wishlist/wishlistThunk';
import { getProductsDetails } from '../features/products/productThunk';

const ProductsDetails = ({ ProductId }: { ProductId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: loadingWishlist } = useSelector(
    (state: RootState) => state.wishlist.createWishList
  );
  const quantity = useSelector((state: RootState) => {
    const item = state.shoppingCart.shoppingCartWithProducts.data.find(
      (item) => item.productId === ProductId
    );
    return item ? item.quantity : 1;
  });
  const { loading } = useSelector(
    (state: RootState) => state.shoppingCart.createshoppingCart
  );

  const productdetailsData = useSelector(
    (state: RootState) => state.products.productsDetails.data.product
  );

  const { loading: productdetailsLoading } = useSelector(
    (state: RootState) => state.products.productsDetails
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
      productId: ProductId,
      quantity: newquantity,
    };
    await dispatch(createshoppingCart(cartItem));
    await dispatch(getshoppingCart());
  };
  useEffect(() => {
    dispatch(getProductsDetails(ProductId));
  }, [dispatch, ProductId]);

  if (productdetailsLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] w-full">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        maxWidth="1200px"
        margin="auto"
        sx={{ marginTop: '50px', marginBottom: '50px' }}
      >
        <Grid item lg={5}>
          <Box
            component={'div'}
            className="bg-cover bg-center h-[420px] rounded border-[1px]"
            style={{
              backgroundImage: `url(${productdetailsData.imageLink})`,
            }}
          ></Box>
        </Grid>
        <Grid item lg={6}>
          <Typography
            variant={'h4'}
            className={'tracking-wider py-2 capitalize'}
            color={'secondary.main'}
          >
            {productdetailsData.name} - {productdetailsData.categoryName}
          </Typography>
          <Box className={'flex item-center py-2 gap-4 '}>
            <Rating name="read-only" value={4} readOnly size={'small'} />
            <p className={'font-bold font-primary text-secondary-main '}>
              ( {productdetailsData.reviewsCount} Reviews )
            </p>
          </Box>
          <Box className={'flex item-center py-4 gap-4 '}>
            <p className="font-bold text-2xl text-secondary-dark">
              ${(productdetailsData.priceWithDiscount)}
            </p>
            <p className="text-primary-main text-2xl font-bold">
              {productdetailsData.priceWithDiscount === productdetailsData.price
                ? "No Discount"
                :"-" + productdetailsData.discount + "%"}
              
            </p>
          </Box>
          <Box
            className={'flex item-center justify-between py-2 gap-4 w-11/12 '}
          >
            <p
              className={
                'font-bold font-primary line-through tracking-widest text-secondary-light text-2xl'
              }
            >
              {productdetailsData.priceWithDiscount === productdetailsData.price
                ? ''
                : productdetailsData.price + '$'}
            </p>
            <p
              className={`font-bold text-xl ${productdetailsData.inStock ? 'text-primary-main' : 'text-red-400'}`}
            >
              {productdetailsData.inStock ? 'In Stock' : 'Out Stock'}
            </p>
          </Box>
          <p className="text-secondary-dark py-4 w-11/12">
            {productdetailsData.description}
          </p>
          <Box className="flex items-center gap-2 mb-4">
            <p className="font-bold capitalize font-secondary-light cursor-text">
              Weight :
            </p>
            <Button
              color="primary"
              variant="outlined"
              className="bg-primary-main w-max cursor-text h-8"
            >
              {productdetailsData.unit}
            </Button>
          </Box>
          <Box className="flex gap-2">
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
            <Button
              className="h-[56px] hover:bg-primary-main hover:text-white w-[50px]"
              color="secondary"
              variant="outlined"
              disabled={loadingWishlist}
              onClick={async () => {
                await dispatch(createWishList(ProductId));
                await dispatch(getWishlist());
              }}
            >
              {loadingWishlist ? (
                <CircularProgress size={8} className="h-max" color="primary" />
              ) : (
                <BiHeart fontSize={24} />
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default ProductsDetails;
