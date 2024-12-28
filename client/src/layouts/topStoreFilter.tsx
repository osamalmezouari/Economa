import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Menu } from '@mui/material';
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaStarHalfAlt,
} from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../features/products/productSlice';
import { getProductsStore } from '../features/products/productThunk';
import { AppDispatch } from '../app/store';

const TopStoreFilter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: any) => state.products.filters);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = async (sort: string) => {
    dispatch(setFilters({ key: 'sort', value: sort }));
    await dispatch(getProductsStore(filters));
    handleClose();
  };

  const handleClearFilters = () => {
    dispatch(setFilters({ key: 'search', value: '' }));
    dispatch(setFilters({ key: 'category', value: '' }));
    dispatch(setFilters({ key: 'weight', value: '' }));
    dispatch(setFilters({ key: 'Minprice', value: 0 }));
    dispatch(setFilters({ key: 'Maxprice', value: 0 }));
    dispatch(setFilters({ key: 'page', value: 1 }));
    dispatch(setFilters({ key: 'sort', value: '' }));
  };

  return (
    <Box className="w-full flex border p-4 items-start justify-end gap-2 h-max">
      <div>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color={'secondary'}
          sx={{ paddingX: '', width: '120px' }}
          variant="outlined"
          className="w-16 h-12"
        >
          Sort By
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="w-[250px]"
        >
          <MenuItem
            onClick={() => handleSortChange('price-asc')}
            className="flex items-center gap-4"
          >
            <FaSortAmountUpAlt className="text-primary-main" /> Price Ascending
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange('price-desc')}
            className="flex items-center gap-4"
          >
            <FaSortAmountDownAlt className="text-primary-main" /> Price
            Descending
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange('rating-asc')}
            className="flex items-center gap-4"
          >
            <FaStar className="text-yellow-500" /> Rating Ascending
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange('rating-desc')}
            className="flex items-center gap-4"
          >
            <FaStarHalfAlt className="text-yellow-500" /> Rating Descending
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange('name-asc')}
            className="flex items-center gap-4"
          >
            <FaSortAlphaUp className="text-primary-main" /> Name Ascending
          </MenuItem>
          <MenuItem
            onClick={() => handleSortChange('name-desc')}
            className="flex items-center gap-4"
          >
            <FaSortAlphaDown className="text-primary-main" /> Name Descending
          </MenuItem>
        </Menu>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="h-12"
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default TopStoreFilter;
