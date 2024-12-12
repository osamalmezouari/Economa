import { RemoveCircleSharp } from '@mui/icons-material';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { shoppingCartItemProps } from './interface';
import { useState } from 'react';
import { AppDispatch } from '../../../app/store';
import { useDispatch } from 'react-redux';
import {
  getshoppingCart,
  removefromshoppingCart,
  updatequantity,
} from '../../../features/shoppingCart/shoppingCartThunk';

const ShoppingCartItem = ({
  productName,
  productPrice,
  productunit,
  productId,
  id,
  svgLink,
  quantity,
}: shoppingCartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleIncrease = async () => {
    setNewQuantity((prevQuantity: number) => prevQuantity + 1);
    dispatch(updatequantity({ id: id, quantity: newQuantity }));
    console.log(newQuantity);
  };

  const handleDecrease = async () => {
    setNewQuantity((prevQuantity: number) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
    dispatch(updatequantity({ id: id, quantity: newQuantity }));
    console.log(newQuantity);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setNewQuantity(value);
      dispatch(updatequantity({ id: id, quantity: newQuantity }));
    } else {
      setNewQuantity(1);
    }
  };

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
          <strong>${productPrice.toFixed(2)}</strong> x{' '}
          <span className="text-black">
            {quantity} {productunit}
          </span>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 100,
            mt: 1,
            border: '1px solid #eee',
            borderRadius: 1,
          }}
        >
          <InputAdornment position="start">
            <BiMinus
              onClick={handleDecrease}
              className="hover:cursor-pointer hover:bg-primary-main hover:rounded-full hover:text-white duration-300 transition-all"
            />
          </InputAdornment>
          <TextField
            value={quantity}
            onChange={handleQuantityChange}
            variant="outlined"
            disabled={true}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ccc',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
            inputProps={{
              style: { height: '20px', textAlign: 'center' },
            }}
          />
          <InputAdornment position="end">
            <BiPlus
              onClick={handleIncrease}
              className="hover:cursor-pointer hover:bg-primary-main hover:rounded-full hover:text-white duration-300 transition-all"
            />
          </InputAdornment>
        </Box>
      </Box>
      <button
        onClick={async () => {
          await dispatch(removefromshoppingCart(id));
          await dispatch(getshoppingCart());
        }}
      >
        <RemoveCircleSharp className="w-16 h-16 cursor-pointer text-secondary-main transition-all duration-1000 ease-in-out hover:text-red-400 font" />
      </button>
    </Box>
  );
};

export default ShoppingCartItem;
