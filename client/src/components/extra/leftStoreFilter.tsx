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
  IconButton,
  CircularProgress,
} from '@mui/material';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/products/productSlice';
import { useEffect, useState } from 'react';
import { getCategoriesNamesandIds } from '../../features/category/categoryThunk';
import { AppDispatch, RootState } from '../../app/store';
import { CategoriesnamesandIds } from '../../types/category';

const StoreFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.products.filters);
  const [loading, setLoading] = useState(false);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [weightExpanded, setWeightExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const categories = useSelector(
    (state: RootState) => state.category.CategoriesnamesandIds.data
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ key: 'search', value: event.target.value }));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ key: 'category', value: category === filters.category ? '' : category }));
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      await dispatch(getCategoriesNamesandIds());
      setLoading(false);
    };
    fetchCategories();
  }, [dispatch]);

  const handleWeightChange = (weight: string) => {
    dispatch(setFilters({ key: 'weight', value: weight }));
  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setFilters({ key: 'Minprice', value: newValue[0] }));
      dispatch(setFilters({ key: 'Maxprice', value: newValue[1] }));
    }
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      dispatch(setFilters({ key: 'Minprice', value }));
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      dispatch(setFilters({ key: 'Maxprice', value }));
    }
  };

  return (
    <Grid
      item
      lg={3}
      md={4}
      sm={12}
      xs={12}
      className="ml-[20px] md:ml-[20px] sm:mx-auto xs:mx-auto border-[1px]"
      sx={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <Box 
        className="rounded-lg overflow-hidden"
        sx={{ padding: '20px', mb: 3 }}
      >
        <Box>
          <Typography variant="h6" color="secondary.main" className="font-semibold mb-2">
            Search
          </Typography>
          <TextField
            sx={{ mt: 1 }}
            variant="outlined"
            fullWidth
            placeholder="Search for a product"
            value={filters.search}
            onChange={handleSearchChange}
            size="small"
          />
        </Box>
      </Box>
      <Box 
        className="rounded-lg overflow-hidden"
        sx={{ padding: '20px', mb: 3 }}
      >
        <Box>
          <Box className="flex justify-between items-center">
            <Typography variant="h6" color="secondary.main" className="font-semibold mb-2">
              Category
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setCategoryExpanded(!categoryExpanded)}
              color="secondary"
            >
              {categoryExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </IconButton>
          </Box>
          <Divider className="my-2" />
          {categoryExpanded && (
            loading ? (
              <Box className="flex justify-center p-4">
                <CircularProgress size={24} color="secondary" />
              </Box>
            ) : (
              <FormGroup className="p-2">
                {categories && categories.length > 0 ? (
                  categories.map((category: CategoriesnamesandIds) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          value={category.name}
                          checked={filters.category === category.name}
                          onChange={() => handleCategoryChange(category.name)}
                          color="secondary"
                          className="transition-all duration-200"
                        />
                      }
                      label={category.name}
                      className="transition-all duration-200 hover:text-secondary-main"
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" className="p-2">
                    No categories available
                  </Typography>
                )}
              </FormGroup>
            )
          )}
        </Box>
      </Box>
      <Box 
        className="rounded-lg overflow-hidden"
        sx={{ padding: '20px', mb: 3 }}
      >
        <Box>
          <Box className="flex justify-between items-center">
            <Typography variant="h6" color="secondary.main" className="font-semibold mb-2">
              Weight
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setWeightExpanded(!weightExpanded)}
              color="secondary"
            >
              {weightExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </IconButton>
          </Box>
          <Divider className="my-2" />
          {weightExpanded && (
            <FormGroup className="p-2" >
            <FormControlLabel
              control={
                <Checkbox
                  value="1kg"
                  checked={filters.weight === '1kg'}
                  onChange={() => handleWeightChange('1kg')}
                  color="secondary"
                  className="transition-all duration-200"
                />
              }
              label="Kilogram"
              className="transition-all duration-200 hover:text-secondary-main"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="1L"
                  checked={filters.weight === '1L'}
                  onChange={() => handleWeightChange('1L')}
                  color="secondary"
                  className="transition-all duration-200"
                  unselectable={'on'} 
                />
              }
              label="Liter"
              className="transition-all duration-200 hover:text-secondary-main"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="piece"
                  checked={filters.weight === 'piece'}
                  onChange={() => handleWeightChange('piece')}
                  color="secondary"
                  className="transition-all duration-200"
                />
              }
              label="Piece"
              className="transition-all duration-200 hover:text-secondary-main"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="pack"
                  checked={filters.weight === 'pack'}
                  onChange={() => handleWeightChange('pack')}
                  color="secondary"
                  className="transition-all duration-200"
                />
              }
              label="Pack"
              className="transition-all duration-200 hover:text-secondary-main"
            />
          </FormGroup>
          )}
        </Box>
      </Box>
      
      <Box 
        className="rounded-lg overflow-hidden"
        sx={{ padding: '20px', mb: 3 }}
      >
        <Box>
          <Box className="flex justify-between items-center">
            <Typography variant="h6" className="font-semibold mb-2" color="secondary.main">
              Price Range
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setPriceExpanded(!priceExpanded)}
              color="secondary"
            >
              {priceExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </IconButton>
          </Box>
          <Divider className="my-2" />
          {priceExpanded && (
            <>
              <Box className="flex justify-center py-4">
                <Slider
                  sx={{ 
                    width: '90%', 
                    '& .MuiSlider-thumb': {
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 0 0 8px rgba(63, 81, 181, 0.16)'
                      }
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.5
                    }
                  }}
                  value={[filters.Minprice, filters.Maxprice]}
                  onChange={handlePriceChange}
                  min={0}
                  max={1000}
                  color="secondary"
                />
              </Box>
              <Grid container spacing={2} className="px-4 mt-2">
                <Grid item xs={6}>
                  <TextField
                    label="Min"
                    type="number"
                    size="small"
                    fullWidth
                    value={filters.Minprice}
                    onChange={handleMinPriceChange}
                    InputProps={{
                      startAdornment: '$',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max"
                    type="number"
                    size="small"
                    fullWidth
                    value={filters.Maxprice}
                    onChange={handleMaxPriceChange}
                    InputProps={{
                      startAdornment: '$',
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default StoreFilter;
