import { Box, Container,  Typography } from '@mui/material';
import AddReview from '../../base/addReview/addReview';
import { reviewContainerProps } from './interface';
import { useAuth } from '../../../context/AuthContext';
import ReviewCards from '../../base/reviewCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReviewContainer = ({ productId }: reviewContainerProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ py: 4, mt: 4, backgroundColor: '#f5f7fa' }} className="mb-6">
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Customers Reviews
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See what our customers are saying about this product
          </Typography>
        </Box>
        <ReviewCards />
        <Box>{isAuthenticated && <AddReview productId={productId} />}</Box>
      </Container>
    </Box>
  );
};

export default ReviewContainer;
