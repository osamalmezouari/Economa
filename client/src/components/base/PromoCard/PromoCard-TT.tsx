import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { PromoCardProps } from './interfaces';
import { FaArrowRight } from 'react-icons/fa';

const PromoCardtoptitle: React.FC<PromoCardProps> = ({
  image,
  title,
  subtitle,
  discountText,
  buttonText,
}) => {
  return (
    <div>
      <Box
        component="div"
        style={{ backgroundImage: `url(${image})`, backgroundColor: '' }}
        className="flex flex-col justify-start bg-cover bg-center  w-full h-[400px] relative px-4 py-6  rounded"
      >
        <Box
          component={'div'}
          className=" text-start flex flex-col gap-2 justify-center"
        >
          <Typography
            variant="body2"
            color="primary"
            fontWeight=""
            className="font-Inria capitalize mt-2"
          >
            {discountText}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="black"
            className=""
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
          {buttonText !== 'none' && (
            <Button
              className="text-black bg-white h-8 text-[12px] p-4 w-max rounded-full"
              endIcon={<FaArrowRight className="w-4 h-2" />}
            >
              {buttonText}
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default PromoCardtoptitle;
