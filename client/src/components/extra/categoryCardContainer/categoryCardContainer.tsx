import { Container } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import CategoryCard from '../../base/category-card/categoryCard';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getCategoryCards } from '../../../features/category/categoryThunk';

const CategoryCardContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.category.CategoryCards
  );

  useEffect(() => {
    dispatch(getCategoryCards());
  }, [dispatch]);

  return (
    <Container style={{ maxWidth: '1200px', marginTop: '40px' }}>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <Grid2
          container
          spacing={4}
          sx={{ alignItems: 'center' }}
          component={'div'}
          className="justify-evenly"
        >
          {data.map((category) => (
            <CategoryCard
              key={category.id}
              linkTo={`/category/${category.id}`}
              svgLink={category.svgLink || ''}
              name={category.name}
              productsCount={category.productsCount || 0}
            />
          ))}
        </Grid2>
      )}
    </Container>
  );
};

export default CategoryCardContainer;
