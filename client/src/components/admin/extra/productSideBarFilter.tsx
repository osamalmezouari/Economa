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
import {  ManageProductsFilters } from '../../../types/product';
import { useState } from 'react';
import { getManageProductsTable } from '../../../features/products/productThunk';

const ManageProductFilterBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (state: RootState) => state.products.productsManage
  );
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    Object.entries(formData).forEach(([key, value]) => {
      dispatch(
        setManageFilter({ key: key as keyof ManageProductsFilters, value })
      );
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
          className="cursor-pointer hover:text-primary-main hover:rotate-90 transition-all duration-300"
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
              inputProps={{ min: 0}}
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
              inputProps={{ min: 1 }}
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
              inputProps={{ min: 0 }}
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
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="m-auto w-11/12 bottom-2 absolute"
              fullWidth
              disabled={loading}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ManageProductFilterBar;
