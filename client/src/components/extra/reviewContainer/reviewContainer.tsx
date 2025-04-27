import { Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import AddReview from '../../base/addReview/addReview';
import { reviewContainerProps } from './interface';
import ReviewCard from '../../base/reviewCard';
import { useAuth } from '../../../context/AuthContext';

const ReviewContainer = ({ productId }: reviewContainerProps) => {
  /*   const dispatch = useDispatch()
   */

  const { isAuthenticated } = useAuth();

  const reviews = useSelector(
    (state: RootState) => state.products.productsDetails.data.reviews
  );

  return (
    <Grid
      container
      className="mx-auto p-4 border-[1px] rounded mb-6"
      maxWidth={'1200px'}
    >
      {reviews.map((review) => {
        return (
          <>
            <ReviewCard {...review} />
          </>
        );
      })}
      <Divider className="h-2" />
      <Grid item lg={12} className="">
        {isAuthenticated && <AddReview productId={productId} />}
      </Grid>
    </Grid>
  );
};

export default ReviewContainer;
