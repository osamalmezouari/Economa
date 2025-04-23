import React from 'react';
import {
  Box,
  CircularProgress,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { GiShoppingCart } from 'react-icons/gi';
import { MiniProductCardTypeProps } from './interfaces';
import { IoBagAdd } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import {
  createshoppingCart,
  getshoppingCart,
} from '../../../features/shoppingCart/shoppingCartThunk';
import { useRouter } from '@tanstack/react-router';
import { CURRENCY_SYMBOL } from '../../../utils/constants';

const MiniProductCard: React.FC<MiniProductCardTypeProps> = ({
  name,
  priceWithDiscount,
  price,
  svgLink,
  productAvgRating,
  productId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (state: RootState) => state.shoppingCart.createshoppingCart
  );
  const Router = useRouter();
  return (
    <Box className=" mini-product-card h-full p-3 flex flex-row  border-[2px]  border-solid border-transparent rounded-lg bg-gray-50 hover:border-primary-main duration-500 transition-all relative">
      <p className="add-to-cart-btn py-1 px-2 absolute top-1 right-1 opacity-0 transition-all duration-300 ease-in-out text-sm font-medium bg-green-600 text-white text-center rounded-md hover:bg-gray-600 hover:text-white">
        <GiShoppingCart className="inline-block" />
      </p>

      <Box className="product-image mr-3 relative ">
        <img
          src={svgLink}
          alt={name}
          className="w-[70px] h-[70px] rounded-md border border-solid border-gray-200 object-cover"
        />
      </Box>

      <Box className="product-info flex flex-col">
        <Typography
          onClick={() => Router.navigate({ to: `/Economa/Store/${productId}` })}
          className="cursor-pointer hover:text-primary-main text-[12px] product-name text-gray-600 block text-sm leading-5 font-medium tracking-wide capitalize  mb-1"
        >
          {name}
        </Typography>
        <Box className="product-rating mb-1 flex">
          <Rating
            name="product-rating"
            value={productAvgRating}
            precision={0.5}
            readOnly
            size={'small'}
          />
        </Box>
        <Box className="product-price">
          <span className="new-price text-base">
          {CURRENCY_SYMBOL}{priceWithDiscount.toFixed(2)}
          </span>
          {price && (
            <span className="old-price ml-1 text-sm text-gray-600 line-through">
              {CURRENCY_SYMBOL}{price.toFixed(2)}
            </span>
          )}
        </Box>
      </Box>
      <Tooltip title="Add to cart">
        <Box
          onClick={async () => {
            console.log(productId);
            await dispatch(
              createshoppingCart({ productId: productId, quantity: 1 })
            );
            await dispatch(getshoppingCart());
          }}
          component={'div'}
          className="border-2 p-1 ml-auto self-end text-secondary-main hover:bg-primary-main hover:text-white cursor-pointer rounded transition-all duration-300 hover:border-transparent"
        >
          {loading ? (
            <CircularProgress size={8} className="h-max" color="primary" />
          ) : (
            <IoBagAdd fontSize={16} />
          )}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default MiniProductCard;
