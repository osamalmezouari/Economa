import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import { CURRENCY_SYMBOL } from '../../utils/constants';
const HeroImage = () => {
  const router = useRouter();
  return (
    <>
      <Box
        className={
          'rounded bg-cover mt-10 bg-center max-w-[1300px] h-[600px] m-auto grid grid-cols-2  p-4 sm:px-24 sm:pt-4'
        }
        component={'div'}
        style={{ backgroundImage: `url(/assets/images/hero-bg-1.jpg)` }}
      >
        <Box className=" row-start-2 md:col-span-1 col-span-2 ">
          <Typography
            variant="h4"
            className="-tracking-tighter font-secondary"
            color="primary"
          >
            Starting at {`10.00`}{CURRENCY_SYMBOL}
          </Typography>
          <Typography
            variant="h1"
            className="-tracking-tighter text-secondary-main"
          >
            Explore fresh & juicy fruits
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<KeyboardDoubleArrowRight />}
            className="text-white top-8 h-12  hover:bg-primary-main"
            onClick={() => router.navigate({ to: '/Economa/Store' })}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HeroImage;
