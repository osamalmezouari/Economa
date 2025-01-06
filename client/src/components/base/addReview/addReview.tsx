import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Rating,
  TextField,
} from '@mui/material';
import { AddReviewProps } from './interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getShoortedUserInfo } from '../../../features/user/userThunk';
import {
  addReview,
  getProductsDetails,
} from '../../../features/products/productThunk';
import { ApiError } from '../../../types/apierror';
import GlobalAlert from '../GlobalAlerts/globalAlert';
import { error } from 'console';

const AddReview = ({ productId }: AddReviewProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<string>(''); // Use number | null for Rating component
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useSelector(
    (state: RootState) => state.user.ShoortedUserInfo
  );
  const { loading: addReviewLoading, error: addReviewError } = useSelector(
    (state: RootState) => state.products.addReview
  );

  useEffect(() => {
    dispatch(getShoortedUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reviewData = {
      productId: productId,
      name,
      email,
      reviewText,
      rating: rating,
    };
    await dispatch(addReview(reviewData));
    await dispatch(getProductsDetails(productId));
    console.log(reviewData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-2xl font-bold my-2 font-main text-primary-main">
        Add a review
      </p>
      <Box className="flex gap-2 mb-6 ">
        <p className="capitalize text-secondary-main pl-1">your rating : </p>
        <Rating
          value={rating}
          size="small"
          precision={0.5}
          aria-required
          onChange={(e) => setRating(e.target.value)}
        />
      </Box>
      <Grid container spacing={2} className="pl-4 mb-6">
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Your name"
            placeholder="name"
            className="mb-4"
            name="name"
            disabled
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: (theme) => theme.palette.primary.light,
                },
                '&:hover fieldset': {
                  borderColor: (theme) => theme.palette.primary.main,
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Email"
            placeholder="Email"
            className="mb-4"
            name="email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: (theme) => theme.palette.primary.light,
                },
                '&:hover fieldset': {
                  borderColor: (theme) => theme.palette.primary.main,
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Enter Your Comment"
            placeholder="Enter Your Comment"
            className="mb-4"
            name="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required={true}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: (theme) => theme.palette.primary.light,
                },
                '&:hover fieldset': {
                  borderColor: (theme) => theme.palette.primary.main,
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={1.5}>
          <Button
            variant="contained"
            fullWidth
            className={
              addReviewLoading
                ? 'mt-4 bg-secondary-light'
                : 'mt-4 bg-primary-main'
            }
            type="submit"
            disabled={addReviewLoading || rating === ''}
          >
            {addReviewLoading ? <CircularProgress color="inherit" /> : 'Submit'}
          </Button>
        </Grid>
        {addReviewError?.statusCode === 409 ? (
          <GlobalAlert message={addReviewError?.message} status="error" />
        ) : (
          ''
        )}
      </Grid>
    </form>
  );
};

export default AddReview;
