import { Box, CircularProgress, Grid, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../../app/store';
import { getProductsStore } from '../../../features/products/productThunk';
import ProductCard from '../../base/ProductCard/ProductCard';
import { setFilters } from '../../../features/products/productSlice';

const StoreProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (state: RootState) => state.products.productsStore
  );
  const { products, productPageCount } = useSelector(
    (state: RootState) => state.products.productsStore.data
  );
  const filters = useSelector((state: RootState) => state.products.filters);

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setFilters({ key: 'page', value: value }));
    await dispatch(getProductsStore(filters));
  };
  useEffect(() => {
    dispatch(getProductsStore(filters));
  }, [dispatch, filters]);

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: '0px' }} className="px-12">
        {loading && !products.length ? (
          <Box className={'w-full flex justify-center items-center py-8'}>
            <CircularProgress className="" />
          </Box>
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
              <ProductCard
                id={product.id}
                discount={product.discount}
                name={product.name}
                categoryName={product.categoryName}
                description={product.description}
                productAvgRating={product.productAvgRating}
                price={product.price}
                priceWithDiscount={product.priceWithDiscount}
                unit={product.unit}
                imageLink={product.imageLink}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Pagination
          count={productPageCount}
          page={filters.page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </>
  );
};

export default StoreProducts;
