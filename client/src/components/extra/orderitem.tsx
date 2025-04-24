import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import {useSelector } from 'react-redux';
import {  RootState } from '../../app/store';
import { FaXmark } from 'react-icons/fa6';
import EmptyBox from '../base/empty-box';
import { CURRENCY_SYMBOL } from '../../utils/constants';

const OrderItem = () => {
  const Router = useRouter();
  const { loading,  data } = useSelector(
    (state: RootState) => state.shoppingCart.shoppingCartWithProducts
  );
  const { loading: createloading } = useSelector(
    (state: RootState) => state.shoppingCart.createshoppingCart
  );
  const { loading: removeloading } = useSelector(
    (state: RootState) => state.shoppingCart.removefromshoppingCart
  );
  return (
    <>
      {!data.length && !loading && <EmptyBox />}
      {loading || createloading || removeloading ? (
        <Box className={'h-[180px] w-full flex justify-center items-center'}>
          <CircularProgress color="primary" size={40} />
        </Box>
      ) : (
        data.length > 0 &&
        data.map((item) => {
          return (
            <Box className="w-full m-auto h-max p-3 flex flex-row items-center   border-[2px]  border-solid border-transparent rounded-lg bg-gray-50 hover:border-primary-main duration-500 transition-all relative">
              <Box className="product-image mr-3 relative ">
                <img
                  src={item.svgLink}
                  alt={''}
                  className="w-[70px] h-[70px] rounded-md border border-solid border-gray-200 object-cover"
                />
              </Box>

              <Box className="flex flex-col justify-center  gap-x-2">
                <Typography
                  onClick={() =>
                    Router.navigate({ to: `/Store/${item.productId}` })
                  }
                  variant={'body2'}
                  className="cursor-pointer !font-main !font-bold hover:text-primary-main tracking-wide capitalize  mb-1"
                >
                  {item.productName}
                </Typography>
                <Box className="flex gap-1 items-center">
                  <Typography
                    className=" text-secondary-main tracking-widest"
                    variant="body2"
                  >
                    {CURRENCY_SYMBOL}{item.productPrice.toFixed(2)}
                  </Typography>
                  <FaXmark fontSize={'10px'} />
                  <Typography
                    className="ml-1 text-secondary-main tracking-widest"
                    variant="body2"
                  >
                    {item.quantity}
                  </Typography>
                </Box>
              </Box>
              <Typography
                className="!ml-auto w-max !font-Inria !font-bold text-primary-main"
                variant="body1"
              >
                {CURRENCY_SYMBOL}
                {item.productPrice * item.quantity > 0 &&
                  (item.productPrice * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          );
        })
      )}
    </>
  );
};
export default OrderItem;
