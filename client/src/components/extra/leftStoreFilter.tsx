import {
  FormControlLabel,
  TextField,
  Typography,
  Box,
  Checkbox,
  Grid,
  Divider,
  FormGroup,
  Slider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/products/productSlice';

const StoreFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.products.filters); // Adjust the state path

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ key: 'search', value: event.target.value }));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ key: 'category', value: category }));
  };

  const handleWeightChange = (weight: string) => {
    dispatch(setFilters({ key: 'weight', value: weight }));

  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setFilters({ key: 'Minprice', value: newValue[0] }));
      dispatch(setFilters({ key: 'Maxprice', value: newValue[1] }));
    }

  };



  return (
    <Grid
      item
      lg={3}
      className="rounded border"
      sx={{ marginTop: '20px', marginBottom: '20px', padding: '10px' }}
    >
      <Box>
        <Typography variant="h6" color="secondary.main">
          Search
          <TextField
            sx={{ padding: '10px' }}
            variant="outlined"
            fullWidth
            placeholder="Search for a product"
            value={filters.search} // Set value from Redux store
            onChange={handleSearchChange}

          />
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="secondary.main">
          Category
        </Typography>
        <Divider className="py-2" />
        <FormGroup className="p-4">
          <FormControlLabel
            control={
              <Checkbox
                value={'Seafood'}
                checked={filters.category === 'Seafood'}
                onChange={() => handleCategoryChange('Seafood')}
              />
            }
            label="Seafood"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={'Vegetables'}
                checked={filters.category === 'Vegetables'}
                onChange={() => handleCategoryChange('Vegetables')}
              />
            }
            label="Vegetables"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={'Milk & Diary'}
                checked={filters.category === 'Milk & Diary'}
                onChange={() => handleCategoryChange('Milk & Diary')}
              />
            }
            label="Milk & Diary"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={'Bakery'}
                checked={filters.category === 'Bakery'}
                onChange={() => handleCategoryChange('Bakery')}
              />
            }
            label="Bakery"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={'Fruits'}
                checked={filters.category === 'Fruits'}
                onChange={() => handleCategoryChange('Fruits')}
              />
            }
            label="Fruits"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={'Fastfood'}
                checked={filters.category === 'Fastfood'}
                onChange={() => handleCategoryChange('Fastfood')}
              />
            }
            label="Fastfood"
          />
        </FormGroup>
      </Box>
      <Box>
        <Typography variant="h6" color="secondary.main">
          Weight
        </Typography>
        <Divider className="py-2" />
        <FormGroup className="p-4">
          <FormControlLabel
            control={
              <Checkbox
                value="kg"
                checked={filters.weight === 'kg'}
                onChange={() => handleWeightChange('kg')}
              />
            }
            label="Kilogram"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="L"
                checked={filters.weight === 'L'}
                onChange={() => handleWeightChange('L')}
              />
            }
            label="Liter"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="piece"
                checked={filters.weight === 'piece'}
                onChange={() => handleWeightChange('piece')}
              />
            }
            label="Piece"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="pack"
                checked={filters.weight === 'pack'}
                onChange={() => handleWeightChange('pack')}
              />
            }
            label="Pack"
          />
        </FormGroup>
      </Box>
      <Box className="py-2">
        <Typography variant="h6" className="pb-2" color="secondary.main">
          Price
        </Typography>
        <Box className="flex justify-center">
          <Slider
            sx={{ width: '80%', padding: '5px' }}
            value={[filters.Minprice, filters.Maxprice]}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000} 
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default StoreFilter;
