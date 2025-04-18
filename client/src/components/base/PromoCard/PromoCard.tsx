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
    <div className="px-6 sm:px-0">
      <Box
        component="div"
        style={{ backgroundImage: `url(${image})` }}
        className="bg-cover w-full m-auto h-[300px] rounded relative bg-center flex justify-center items-center text-center sm:block sm:text-start"
      >
        <Box
          component={'div'}
          className=" sm:absolute sm:right-[10%] sm:top-[25%] text-end"
        >
          <Typography variant="h3" fontWeight="bold" color="secondary">
            {title}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {subtitle}
          </Typography>
          <Typography
            variant="body2"
            color="success.main"
            fontWeight="bold"
            gutterBottom
          >
            {discountText}
          </Typography>
          {buttonText !== 'none' && (
            <Button
              variant="contained"
              color="secondary"
              className="hover:bg-primary-main bg-secondary-main h-8"
              sx={{
                textTransform: 'none',
                fontSize: 16,
                borderRadius: '1px',
                padding: '22px',
              }}
            >
              {buttonText}
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default PromoCard;
