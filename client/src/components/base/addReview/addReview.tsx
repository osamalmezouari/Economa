import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Rating,
  TextField,
  Typography,
  Paper,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddReviewProps } from './interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getShoortedUserInfo } from '../../../features/user/userThunk';
import {
  addReview,
  getProductsDetails,
} from '../../../features/products/productThunk';
import GlobalAlert from '../globalAlert';
import { AddReview as AddReviewType } from '../../../types/review';

const AddReview = ({ productId }: AddReviewProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);
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
    const reviewData: AddReviewType = {
      productId: productId,
      name,
      email,
      reviewText,
      rating: rating,
    };
    await dispatch(addReview(reviewData));
    await dispatch(getProductsDetails(productId));
  };

  const StyledRating = styled(Rating)(({ theme }) => ({}));
  const handleReviewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReviewText(value);
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: '5px',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: 'primary.main',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '40px',
                height: '3px',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              },
            }}
          >
            Add a Review
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              Your rating:
            </Typography>
            <StyledRating
              value={rating}
              size="small"
              precision={0.5}
              onChange={(_, newValue) => setRating(newValue || 0)}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Your name"
                placeholder="name"
                name="name"
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                placeholder="Email"
                name="email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Enter Your Comment"
                placeholder="Share your experience with this product..."
                name="reviewText"
                value={reviewText}
                onChange={handleReviewTextChange}
                required={true}
                multiline
                rows={4}
                inputProps={{ maxLength: 150 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                disabled={addReviewLoading || !rating}
                sx={{
                  backgroundColor: addReviewLoading
                    ? 'secondary.light'
                    : 'primary.main',
                }}
              >
                {addReviewLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    <span>Submitting...</span>
                  </Box>
                ) : (
                  'Submit Review'
                )}
              </Button>
            </Grid>
          </Grid>

          {addReviewError && (
            <Box sx={{ mt: 2 }}>
              <GlobalAlert message={addReviewError} status="error" />
            </Box>
          )}
        </form>
      </Paper>
    </Fade>
  );
};

export default AddReview;
