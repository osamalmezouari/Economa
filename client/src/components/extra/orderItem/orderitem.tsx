import { Box, Typography } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import { GiShoppingCart } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { FaXmark } from 'react-icons/fa6';

const OrderItem = () => {
  const Router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.shoppingCart.shoppingCartWithProducts
  );
  return (
    <Box className="w-full h-full p-3 flex flex-row items-center   border-[2px]  border-solid border-transparent rounded-lg bg-gray-50 hover:border-primary-main duration-500 transition-all relative">
      <Box className="product-image mr-3 relative ">
        <img
          src={'assets/products/fastfood/product1.jpg'}
          alt={''}
          className="w-[70px] h-[70px] rounded-md border border-solid border-gray-200 object-cover"
        />
      </Box>

      <Box className="flex flex-col justify-center  gap-x-2">
        <Typography
          /*  onClick={() => Router.navigate({ to: `/Store/${   }` })} */
          variant={'body2'}
          className="cursor-pointer !font-main !font-bold hover:text-primary-main tracking-wide capitalize  mb-1"
        >
          product name
        </Typography>
        <Box className="flex gap-1 items-center">
          <Typography
            className=" text-secondary-main tracking-widest"
            variant="body2"
          >
            ${'15'}
          </Typography>
          <FaXmark fontSize={'10px'} />
          <Typography
            className="ml-1 text-secondary-main tracking-widest"
            variant="body2"
          >
            {'3'}
          </Typography>
        </Box>
      </Box>
      <Typography
        className="!ml-auto w-max !font-Inria !font-bold text-primary-main"
        variant="body1"
      >
        $45.00
      </Typography>
    </Box>
  );
};
export default OrderItem;
