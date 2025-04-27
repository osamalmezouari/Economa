import { useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Avatar, Container, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getProductsReviews } from '../../features/products/productThunk';

const TestimonialCard = styled(Box)(() => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '24px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  margin: '10px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CustomArrow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const TestimonialsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const testimonials = useSelector(
    (state: RootState) => state.products.testimonials.data
  );
  useEffect(() => {
    dispatch(getProductsReviews());
  }, [dispatch]);

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <CustomArrow onClick={onClick} sx={{ right: { xs: '5px', md: '-20px' } }}>
        ›
      </CustomArrow>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <CustomArrow onClick={onClick} sx={{ left: { xs: '5px', md: '-20px' } }}>
        ‹
      </CustomArrow>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f7fa' }} className={'my-6'}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            What Our Clients Say
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Customer experiences into relatable clients can connect with.
          </Typography>
        </Box>

        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <Box key={testimonial.id} className={''}>
              <TestimonialCard>
                <Rating
                  className="my-2"
                  name="half-rating"
                  size="small"
                  value={testimonial.rating}
                  precision={0.5}
                  sx={{
                    transform: 'scale(0.75)',
                    transformOrigin: 'left center',
                  }}
                />
                <Typography
                  variant="body2"
                  className="font-Inria"
                  sx={{ mb: 3, flexGrow: 1 }}
                >
                  {testimonial.reviewText}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.user.avatar}
                    alt={testimonial.user.name}
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="body1" className={'font-main'}>
                      {testimonial.user.name}
                    </Typography>
                    <Typography variant="body2">
                      {testimonial.user.email}
                    </Typography>
                  </Box>
                </Box>
              </TestimonialCard>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default TestimonialsContainer;
