import { Avatar, Box, Rating, Typography } from '@mui/material';
import { CustomArrow, StyledCard } from '../shared/CardStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Slider from 'react-slick';

const ReviewCards = () => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('En-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const reviews = useSelector(
    (state: RootState) => state.products.productsDetails.data.reviews
  );

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
    infinite: false ,
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
    <>
      <Slider {...settings} className='mb-8'>
        {reviews.map((review) => (
          <Box key={review.id} className={''}>
            <StyledCard>
              <Rating
                className="my-2"
                name="half-rating"
                size="small"
                value={review.rating || 0}
                precision={0.5}
                readOnly
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
                {review.reviewText || 'No review text provided.'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={review.user.avatar}
                  alt={review.user.name || 'A'}
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Typography variant="body1" className={'font-main'}>
                    {review.user.name || 'Anonymous'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.createdAt ? formatDateTime(review.createdAt) : ''}
                  </Typography>
                </Box>
              </Box>
            </StyledCard>
          </Box>
        ))}
      </Slider>
    </>
  );
};

export default ReviewCards;
