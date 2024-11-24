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
        padding: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
    <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '50%',
          height: '100%',
          borderRadius: 2,
          objectFit: 'cover',
        }}
      />

      {/* Text and Button Section */}
      <Box sx={{ paddingLeft: 3, flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
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
          color="success"
          sx={{ textTransform: 'none', fontSize: 16 }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default PromoCard;
