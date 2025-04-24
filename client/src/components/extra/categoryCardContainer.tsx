import { Box, CircularProgress, Container, Typography } from '@mui/material';
import CategoryCard from '../base/categoryCard';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getCategoryCards } from '../../features/category/categoryThunk';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroTitle from './Titles/HeroTitle';

const CategoryCardContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.category.CategoryCards
  );

  useEffect(() => {
    dispatch(getCategoryCards());
  }, [dispatch]);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  // Limit to maximum 8 items

  return (
    <Container style={{ maxWidth: '1350px', marginTop: '40px' }}>
      {loading ? (
        <Box className={'w-full flex justify-center items-center py-8'}>
          <CircularProgress className="" />
        </Box>
      ) : (
        <>
          <HeroTitle
            title="Our Categories "
            subtitle="New products with updated stocks."
          />
          <Slider {...sliderSettings}>
            {data.map((category) => (
              <div key={category.id} style={{ padding: '0 10px' }}>
                <CategoryCard
                  linkTo={`/category/${category.id}`}
                  svgLink={category.svgLink || ''}
                  name={category.name}
                  productsCount={category.productsCount || 0}
                />
              </div>
            ))}
          </Slider>
        </>
      )}
    </Container>
  );
};

export default CategoryCardContainer;
