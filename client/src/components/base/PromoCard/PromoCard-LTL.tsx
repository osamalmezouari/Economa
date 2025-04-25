import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { PromoCardProps } from './interfaces';
import { FaArrowRight } from 'react-icons/fa';

const PromoCardlefttitlelarge: React.FC<PromoCardProps> = ({
  image,
  title,
  subtitle,
  discountText,
  buttonText,
}) => {
  return (
    <div className='w-[1300px] h-[250px]  m-auto'>
      <Box
        component="div"
        style={{ backgroundImage: `url(${image})` }}

        className="flex flex-col justify-center bg-cover bg-top  w-full h-full relative px-4 py-6  rounded"
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
            variant="h3"
            fontWeight="bold"
            color="black"
            className="w-1/2 my-0"
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

export default PromoCardlefttitlelarge;
