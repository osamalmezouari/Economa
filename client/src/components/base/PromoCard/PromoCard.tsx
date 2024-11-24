import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { PromoCardProps } from './interfaces';

const PromoCard: React.FC<PromoCardProps> = ({
  image,
  title,
  subtitle,
  discountText,
  buttonText,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <Box
        component="div"
        style={{ backgroundImage: `url(${image})` }}
        className="w-full h-[350px] rounded-xl relative bg-center flex justify-center items-center text-center sm:block sm:text-start"
      >
        <Box component={'div'} className=" sm:absolute sm:right-[10%] sm:top-[25%]">
          <Typography
            variant="h2"
            fontWeight="bold"
            color="secondary"
          >
            {title}
          </Typography>
          <Typography variant="h2" color="text.secondary" >
            {subtitle}
          </Typography>
          <Typography
            variant="body1"
            color="success.main"
            fontWeight="bold"
            gutterBottom
          >
            {discountText}
          </Typography>
          <Button
            variant="contained"
            color='secondary'
            className='hover:bg-primary-main bg-secondary-main h-8'
            sx={{ textTransform: 'none', fontSize: 16 }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PromoCard;
