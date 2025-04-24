import { Box, Typography } from '@mui/material';
import { WishlistItemProps } from './interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { RemoveCircleSharp } from '@mui/icons-material';
import { getWishlist, removefromWishList } from '../../../features/wishlist/wishlistThunk';
import { CURRENCY_SYMBOL } from '../../../utils/constants';

const WishlistItem = ({
  id,
  productName,
  productPrice,
  productunit,
  productId,
  svgLink,
}: WishlistItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      key={productId}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        p: 2,
        border: '1px solid #eee',
        borderRadius: 1,
      }}
    >
      <Box
        component="img"
        src={svgLink}
        alt={productName}
        sx={{ maxWidth: '30%' }}
      />
      <Box sx={{ flexBasis: '70%', pl: 2 }}>
        <Typography
        className='capitalize'
          variant="body1"
          color="#777"
          sx={{
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {productName}
        </Typography>
        <Typography variant="body2" color="#777" sx={{ mt: 1 }}>
          <strong>{CURRENCY_SYMBOL}{productPrice.toFixed(2)}</strong> x{' '}
          <span className="text-black">{productunit}</span>
        </Typography>
      </Box>
      <button
        onClick={async () => {
          await dispatch(removefromWishList(id));
          await dispatch(getWishlist());
        }}
      >
        <RemoveCircleSharp className="w-6 h-6 cursor-pointer text-secondary-main transition-all duration-1000 ease-in-out hover:text-red-400 font" />
      </button>
    </Box>
  );
};

export default WishlistItem;
