import { Badge, Box, Rating, Typography } from '@mui/material';
import { useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import { TbShoppingBag } from 'react-icons/tb';
import { CompareItemProps } from './interface';
import { Cancel } from '@mui/icons-material';
import { BiBox } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { createWishList } from '../../../features/wishlist/wishlistThunk';
import { createshoppingCart } from '../../../features/shoppingCart/shoppingCartThunk';
import { removeCompareItem } from '../../../features/compare/compareSlice';
import { setDisplayCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { setDisplayWishlist } from '../../../features/wishlist/wishlistSlice';
import { getComparedProductDetails } from '../../../features/compare/compareThunk';

const CompareItem = ({
  svgLink,
  productName,
  productId,
  categoryName,
  rating,
  reviewsCount,
  price,
  weight,
  description,
  stock,
}: CompareItemProps) => {
  const [toggleActions, setToggleActions] = useState<boolean>(false);
  const compareItemsIds  = useSelector(
    (state: RootState) => state.compare.compareItemsIds
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box className="header min-w-[300px] max-w-[300px] h-full">
      <Box
        sx={{ fontWeight: 'bold', color: 'secondary.main.dark' }}
        className="font-bold h-[200px] border-[1px] text-center flex border-l-0 items-center  p-4"
      >
        <Box
          component={'div'}
          onMouseEnter={() => setToggleActions(true)}
          onMouseLeave={() => setToggleActions(false)}
          style={{
            backgroundImage: `url(${svgLink})`,
          }}
          className="w-full h-full flex items-center justify-center bg-cover bg-center gap-2 relative"
        >
          <Cancel
            onClick={async () => {
              dispatch(removeCompareItem(productId));
              await dispatch(getComparedProductDetails(compareItemsIds));
              console.log(compareItemsIds);
            }}
            className="absolute top-0 right-0 bg-secondary-main text-white rounded w-8 h-8 p-1 hover:text-white hover:bg-red-400 cursor-pointer duration-300 transation-all"
          />
          {toggleActions && (
            <IoHeart
              onClick={async () => {
                dispatch(setDisplayWishlist());
                await dispatch(createWishList(productId));
              }}
              className="bg-secondary-main text-white rounded w-8 h-8 p-1 hover:text-white hover:bg-primary-main cursor-pointer duration-300 transation-all"
            />
          )}
          {toggleActions && (
            <TbShoppingBag
              onClick={async () => {
                dispatch(setDisplayCart());
                await dispatch(
                  createshoppingCart({ productId: productId, quantity: 1 })
                );
              }}
              className="bg-secondary-main text-white rounded w-8 h-8 p-1 hover:text-white hover:bg-primary-main cursor-pointer duration-300 transation-all"
            />
          )}
        </Box>
      </Box>
      <Typography
        sx={{ fontWeight: 'light', color: '#7C8C94' }}
        className="border-[1px] border-t-0 h-12 text-start border-l-0 flex items-center  p-2 font-secondary"
      >
        {productName}
      </Typography>
      <Typography
        sx={{ fontWeight: 'light', color: '#7C8C94' }}
        className="font-bold border-[1px] border-t-0 h-12 text-start border-l-0 flex items-center p-2"
      >
        {categoryName}
      </Typography>
      <Typography
        sx={{ fontWeight: 'light', color: '#7C8C94' }}
        className="font-bold border-[1px] border-t-0 h-12 text-start border-l-0 flex items-center p-2 "
      >
        <Rating
          name="half-rating-read"
          size="small"
          precision={0.5}
          value={rating}
        />{' '}
        ({reviewsCount})
      </Typography>
      <Typography
        sx={{ fontWeight: 'light', color: '#7C8C94' }}
        className=" font-bold border-[1px] border-t-0 h-12 text-start border-l-0 flex items-center p-2"
      >
        {price}$
      </Typography>
      <Typography
        sx={{ fontWeight: 'light', color: '#7C8C94' }}
        className=" font-bold border-[1px] border-t-0 h-16 justify-center border-l-0 flex items-center p-2"
      >
        <Badge color="primary" badgeContent={stock} max={999}>
          <BiBox size={30} />
        </Badge>
      </Typography>
      <Typography
        sx={{ fontWeight: 'light', color: '#7C8C94' }}
        className="font-bold border-[1px] border-t-0 h-12 text-start border-l-0 flex items-center p-2"
      >
        {weight}
      </Typography>
      <Typography
        sx={{ fontWeight: 'light', color: '#7C8C94' }}
        className="font-bold border-[1px] border-t-0 border-l-0 h-[170px] text-start flex p-2"
      >
        {description}
      </Typography>
    </Box>
  );
};
export default CompareItem;
