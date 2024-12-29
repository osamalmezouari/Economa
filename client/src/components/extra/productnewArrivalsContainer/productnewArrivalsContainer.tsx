import { Box, CircularProgress, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getProductsNewArrivals } from '../../../features/products/productThunk';
import { useEffect } from 'react';
import ProductCard from '../../base/ProductCard/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const ProductnewArrivalsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsNewArrivals } = useSelector(
    (state: RootState) => state.products
  );
  const { loading, data } = productsNewArrivals;

  useEffect(() => {
    dispatch(getProductsNewArrivals());
  }, [dispatch]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ margin: 'auto', maxWidth: '1350px', padding: '20px' }}>
      {loading ? (
        <Box className={'w-full flex justify-center items-center py-8'}>
          <CircularProgress className='' />
        </Box>
      ) : (
        <>
          {/* First Slider - Group 1 */}
          <Slider {...sliderSettings} className='mb-6'>
            {data?.slice(0, Math.ceil(data.length / 2)).map((product) => (
              <div key={product.id}>
                <Grid container spacing={2}>
                  <Grid item >
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
                </Grid>
              </div>
            ))}
          </Slider>

          {/* Second Slider - Group 2 */}
          <Slider {...sliderSettings}>
            {data?.slice(Math.ceil(data.length / 2), data.length).map((product) => (
              <div key={product.id}>
                <Grid container spacing={2}>
                  <Grid item >
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
                </Grid>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default ProductnewArrivalsContainer;
