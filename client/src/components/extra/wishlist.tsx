import { Box, Typography, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { AppDispatch } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect } from 'react';
import WishlistItem from '../base/wishlistItem/wishlistItem';
import { getWishlist } from '../../features/wishlist/wishlistThunk';
import { WishlistType } from '../../types/wishlist';
import { setDisplayWishlist } from '../../features/wishlist/wishlistSlice';
import EmptyBox from '../base/empty-box';
import GlobalAlert from '../base/globalAlert';
const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );
  const { error: createError } = useSelector(
    (state: RootState) => state.wishlist.createWishList
  );
  const { error: removeError } = useSelector(
    (state: RootState) => state.wishlist.removefromWishList
  );
  const { open } = useSelector((state: RootState) => state.wishlist);

  const cartItems: WishlistType[] = data;
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',

        width: '380px',
      }}
      className={`bg-white z-[100] fixed top-0 p-4 right-0 transition-all duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
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
            My Wishlist
          </Typography>
          <button>
            <Cancel
              className="w-8 h-8 cursor-pointer  text-red-500 font"
              onClick={() => {
                dispatch(setDisplayWishlist());
              }}
            />
          </button>
        </Box>
        <Box
          className={`h-[80vh] overflow-y-scroll px-4 ${(loading || error) && 'flex items-center justify-center'} `}
        >
          {loading && <CircularProgress color="primary" className="m-auto" />}
          {!cartItems.length && !loading && <EmptyBox />}
          {!loading &&
            !error &&
            cartItems.map((item) => {
              return (
                <>
                  <WishlistItem
                    productName={item.productName}
                    productPrice={item.productPrice}
                    productunit={item.productunit}
                    id={item.id}
                    productId={item.productId}
                    svgLink={item.svgLink}
                  />
                </>
              );
            })}
        </Box>
        {createError && <GlobalAlert message={createError} status="warning" />}
        {removeError && <GlobalAlert message={removeError} status="warning" />}
      </Box>
    </Box>
  );
};

export default Wishlist;
