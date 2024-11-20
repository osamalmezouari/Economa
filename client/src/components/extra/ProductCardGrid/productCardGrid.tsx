import { Grid } from '@mui/material'; // Corrected Grid2 to Grid if needed for compatibility
import ProductCard from '../../base/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { useEffect } from 'react';
import { getproductsCards } from '../../../features/products/productThunk';

const ProductCardGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCard } = useSelector((state: RootState) => state.products);
  const { loading, data } = productsCard;

  useEffect(() => {
    dispatch(getproductsCards());
  }, [dispatch]);
  return (
    <Grid container spacing={2} maxWidth={'1200px'} margin={'auto'}>
      {loading
        ? 'loading ... ... ...'
        : data.map((productCard) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={productCard.id}>
                <ProductCard
                  id={productCard.id}
                  discount={productCard.discount}
                  name={productCard.name}
                  categoryName={productCard.categoryName}
                  description={productCard.description}
                  productAvgRaiting={productCard.productAvgRaiting}
                  price={productCard.price}
                  priceWithDiscount={productCard.priceWithDiscount}
                  unit={productCard.unit}
                  imageLink={productCard.imageLink}
                />
              </Grid>
            );
          })}
    </Grid>
  );
};

export default ProductCardGrid;
