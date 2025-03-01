/* import { Box, Divider, Grid2, TextField, Typography } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import {
  setManageFilter,
  setOpenFilter,
} from '../../../features/products/productSlice';
import { ManageProduct } from '../../../types/product';

const ManageproductFilterBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { min_price, max_price, min_stock, max_stock, category } = useSelector(
    (state: RootState) => state.products.manageProductsFilters.filters
  );

  const open = useSelector(
    (state: RootState) => state.products.manageProductsFilters.openFilters
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    const parsedValue = type === 'number' ? Number(value) || 0 : value;

    dispatch(
      setManageFilter({ key: name as keyof ManageProduct, value: parsedValue })
    );
  };
  return (
    <Box
      sx={{
        height: '100vh',
        width: '380px',
      }}
      className={`bg-white z-[100] top-0 fixed py-6 right-0 transition-all duration-500 ${open ? 'translate-x-0' : 'translate-x-full  '}'`}
    >
      <Box className={'flex justify-between items-center px-6'}>
        <Typography variant="h6">Table Fitler</Typography>
        <IoClose
          className="cursor-pointer"
          onClick={() => dispatch(setOpenFilter())}
        />
      </Box>
      <Divider className="mt-4" />
      <Grid2 container spacing={2} sx={{ mb: 2 }} className={'px-4 mt-8'}>
        <Grid2 size={12}>
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Min Price"
            name="min_price"
            type="number"
            value={min_price}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Max Price"
            name="max_price"
            type="number"
            value={max_price}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Min Stock"
            name="min_stock"
            type="number"
            value={min_stock}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Max Stock"
            name="max_stock"
            type="number"
            value={max_stock}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default ManageproductFilterBar;
 */

import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import {
  setManageFilter,
  setOpenFilter,
} from '../../../features/products/productSlice';
import { ManageProduct } from '../../../types/product';
import { useState } from 'react';
import { getManageProductsTable } from '../../../features/products/productThunk';

const ManageProductFilterBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(
    (state: RootState) => state.products.manageProductsFilters.filters
  );
  const open = useSelector(
    (state: RootState) => state.products.manageProductsFilters.openFilters
  );

  // Local state for form values
  const [formData, setFormData] = useState(filters);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) || 0 : value,
    });
  };

  const handleSubmit =async  (event: React.FormEvent) => {
    event.preventDefault();
    Object.entries(formData).forEach(([key, value]) => {
      dispatch(setManageFilter({ key: key as keyof ManageProduct, value }));
    });
    await dispatch(getManageProductsTable(filters));
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '380px',
      }}
      className={`bg-white z-[100] top-0 fixed py-6 right-0 transition-all duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <Box className="flex justify-between items-center px-6">
        <Typography variant="h6">Table Filter</Typography>
        <IoClose
          className="cursor-pointer"
          onClick={() => dispatch(setOpenFilter())}
        />
      </Box>
      <Divider className="mt-4" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 mt-8">
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Min Price"
              name="min_price"
              type="number"
              value={formData.min_price}
              onChange={handleChange}
              /* inputProps={{ min: 1 }} */
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Max Price"
              name="max_price"
              type="number"
              value={formData.max_price}
              onChange={handleChange}
              /* inputProps={{ min: 5 }} */
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Min Stock"
              name="min_stock"
              type="number"
              value={formData.min_stock}
              onChange={handleChange}
             /*  inputProps={{ min: 0 }} */
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Max Stock"
              name="max_stock"
              type="number"
              value={formData.max_stock}
              onChange={handleChange}
             /*  inputProps={{ min: 5 }} */
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className='m-auto w-11/12 bottom-2 absolute' fullWidth>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ManageProductFilterBar;
