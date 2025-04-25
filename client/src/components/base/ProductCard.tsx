import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { GrView } from 'react-icons/gr';
import { IoBagAdd, IoGitCompare, IoHeart } from 'react-icons/io5';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import {
  createshoppingCart,
  getshoppingCart,
} from '../../features/shoppingCart/shoppingCartThunk';
import {
  createWishList,
  getWishlist,
} from '../../features/wishlist/wishlistThunk';
import { addCompareItem } from '../../features/compare/compareSlice';
import { useRouter } from '@tanstack/react-router';
import { ProductCardType } from '../../types/product';
import ProductDialog from './ProductDialog';
import { CURRENCY_SYMBOL } from '../../utils/constants';

export default function ProductCard({
  id,
  discount,
  name,
  categoryName,
  description,
  productAvgRating,
  price,
  priceWithDiscount,
  imageLink,
  unit,
  reviewsCount,
}: ProductCardType) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (state: RootState) => state.shoppingCart.createshoppingCart
  );
  const { loading: loadingWishlist } = useSelector(
    (state: RootState) => state.wishlist.createWishList
  );
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState<ProductCardType | {}>();

  const handleOpen = (data: ProductCardType) => {
    setOpen(!open);
    setDialogData(open ? {} : { ...data });
  };

  const addProducttoshoppingCart = async () => {
    await dispatch(createshoppingCart({ productId: id, quantity: 1 }));
    await dispatch(getshoppingCart());
  };
  const Router = useRouter();
  return (
    <Card
      sx={{
        maxWidth: 255,
        maxHeight: 400,
        borderRadius: '2px',
        border: '1px solid #eeeeee',
        margin: 'auto',
        height: '400px',
        boxShadow: '0 0 0px ',
      }}
      className="group relative overflow-hidden"
    >
      <CardMedia
        sx={{ height: 220, width: 160, margin: 'auto' }}
        className="bg-contain bg-center transition-transform duration-300"
        image={imageLink}
        title={name}
      >
        {discount > 0 && (
          <div className="absolute top-8 left-4">
            <Badge
              className="bg-red-400 text-white text-center  rounded-sm px-2 uppercase text-[12px]"
              sx={{ textAlign: 'center' }}
            >
              - {discount} %
            </Badge>
          </div>
        )}
        <div className="absolute top-2 left-4">
          <Badge className="bg-primary-main text-white  rounded-sm px-2 uppercase text-[12px]">
            {unit}
          </Badge>
        </div>
      </CardMedia>
      <Divider className="h-1" />
      <Box className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 w-7/12 flex h-max top-[240px] group-hover:top-[170px] hover:z-10 items-center mx-auto justify-between bg-slate-100 p-2 rounded-xl">
        <Tooltip title="Add to cart">
          <Box
            component={'div'}
            className="w-[26px] h-[26px] border-2 flex justify-center items-center  text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent"
          >
            {loading ? (
              <CircularProgress size={8} className="h-max" color="inherit" />
            ) : (
              <IoBagAdd
                fontSize={16}
                onClick={() => addProducttoshoppingCart()}
              />
            )}
          </Box>
        </Tooltip>
        <Tooltip title="Quick View">
          <Box
            component={'div'}
            className="w-[26px] h-[26px] border-2 flex justify-center items-center text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent"
            onClick={() =>
              handleOpen({
                id,
                discount,
                name,
                categoryName,
                description,
                productAvgRating,
                price,
                priceWithDiscount,
                imageLink,
                unit,
                reviewsCount,
              })
            }
          >
            <GrView fontSize={16} />
          </Box>
        </Tooltip>
        <Tooltip title="Add to Compare list">
          <Box
            component={'div'}
            onClick={() => dispatch(addCompareItem(id))}
            className="w-[26px] h-[26px] border-2 flex justify-center items-center text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent"
          >
            <IoGitCompare fontSize={16} />
          </Box>
        </Tooltip>
        <Tooltip title="Add to wishlist">
          <Box
            component={'div'}
            className="w-[26px] h-[26px] border-2 flex justify-center items-center  text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent"
          >
            {loadingWishlist ? (
              <CircularProgress size={12} className=" !text-white !m-auto" />
            ) : (
              <IoHeart
                fontSize={16}
                onClick={async () => {
                  await dispatch(createWishList(id));
                  await dispatch(getWishlist());
                }}
              />
            )}
          </Box>
        </Tooltip>
      </Box>

      <CardContent
        sx={{ padding: '5px 10px' }}
        className="flex flex-col gap-2 h-full"
      >
        <Typography
          variant="body1"
          onClick={() => Router.navigate({ to: `/Economa/Store/${id}` })}
          className="my-1 font-main text-secondary-main capitalize hover:text-primary-main cursor-pointer transition-colors duration-500"
        >
          {name}
        </Typography>
        <p className="text-secondary-main capitalize mb-3 max-h-6 overflow-hidden text-[14px] ">
          {categoryName}
        </p>
        <Box className="flex items-center gap-0">
          <Rating
            name="half-rating"
            size="small"
            value={productAvgRating}
            precision={0.5}
            onClick={() => Router.navigate({ to: `/Economa/Store/${id}` })}
            sx={{ transform: 'scale(0.75)', transformOrigin: 'left center' }}
          />
          <Typography variant="body2" className="mx-0 font-Inria -ml-5">
            ({reviewsCount})
          </Typography>
        </Box>

        <Box className="flex gap-8 text-secondary-main">
          {priceWithDiscount < price && priceWithDiscount > 0 ? (
            <>
              <p className="text-primary-main font-bold">
                {CURRENCY_SYMBOL}
                {priceWithDiscount}
              </p>
              <p className="line-through text-red-500">
                {CURRENCY_SYMBOL}
                {price}
              </p>
            </>
          ) : (
            <p className="text-primary-main font-bold">
              {CURRENCY_SYMBOL}
              {price}
            </p>
          )}
        </Box>
      </CardContent>

      {open && (
        <ProductDialog
          open={open}
          setopen={setOpen}
          {...(dialogData as ProductCardType)}
        />
      )}
    </Card>
  );
}
