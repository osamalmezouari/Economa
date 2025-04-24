import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Button, Grid2, Typography } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import { CURRENCY_SYMBOL } from '../../utils/constants';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition-all"
      style={{ width: '40px', height: '40px' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition-all"
      style={{ width: '40px', height: '40px' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
};

const HeroImage = () => {
  const router = useRouter();

  // Hero image data
  const heroSlides = [
    {
      image: '/assets/images/hero-bg-3.jpg',
      startingPrice: '10.00',
      title: 'Explore Fresh & Juicy Fruits',
    },
    {
      image: '/assets/images/hero-bg-4.jpg', // Assuming you have a second image
      startingPrice: '15.00',
      title: 'Fresh & Crunchy Vegetables',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <div className="max-w-[1300px] mx-auto mt-10 relative">
      <Slider {...sliderSettings}>
        {heroSlides.map((slide, index) => (
          <div key={index}>
            <Grid2
              container
              className={
                'rounded bg-cover items-center bg-center h-[400px] p-4 sm:px-24 sm:pt-4'
              }
              component={'div'}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <Grid2 size={{ xl: 7 }}></Grid2>
              <Grid2 size={{ xl: 4 }} className=" ">
                <Typography
                  variant="h6"
                  className="-tracking-tighter font-secondary"
                  color="primary"
                >
                  Starting at {slide.startingPrice}
                  {CURRENCY_SYMBOL}
                </Typography>
                <Typography
                  variant="h3"
                  className="-tracking-tighter text-secondary-main"
                >
                  {slide.title}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<KeyboardDoubleArrowRight />}
                  className="text-white top-4 ml-2 h-12 hover:bg-primary-main"
                  onClick={() => router.navigate({ to: '/Economa/Store' })}
                >
                  Shop Now
                </Button>
              </Grid2>
            </Grid2>
          </div>
        ))}
      </Slider>
      <style>{`
        .custom-dots {
          bottom: 15px;
        }
        .custom-dots li button:before {
          font-size: 10px;
          color: white;
          opacity: 0.5;
        }
        .custom-dots li.slick-active button:before {
          opacity: 1;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default HeroImage;
