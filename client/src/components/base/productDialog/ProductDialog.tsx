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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { ProductDialogProps } from '../../../types/product';

export default function ProductDialog({
  open,
  setopen,
  id,
  discount,
  name,
  description,
  productAvgRaiting,
  price,
  priceWithDiscount,
  unit,
  imageLink,
}: ProductDialogProps) {
  return (
    <Dialog
      className="h-full"
      onClose={() => setopen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '800px',
          borderRadius: '8px',
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
          onClick={() => setopen(false)}
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
            <div
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
                <Badge className="bg-primary-main  text-white rounded-sm px-2 uppercase text-[12px]">
                  1 {unit}
                </Badge>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="p-4">
            <p className="tracking-wide font-normal text-secondary-main text-2xl mt-4 cursor-pointer hover:text-primary-main transition-all duration-300">
              {name}
            </p>
            <Rating
              name="half-rating"
              size="small"
              defaultValue={productAvgRaiting}
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

            <DialogActions sx={{ padding: '5px !important' }}>
              <TextField
                className="w-16 text-secondary-main"
                defaultValue={5}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiPlus className="hover:cursor-pointer hover:bg-primary-main hover:rounded-full hover:text-white duration-300 transition-all" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <BiMinus className="hover:cursor-pointer hover:bg-primary-main hover:rounded-full hover:text-white duration-300 transition-all" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                className="h-[56px] hover:bg-primary-main"
                startIcon={<ShoppingBagOutlined />}
                color="secondary"
                variant="contained"
              >
                Add to Cart
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
