// BannerCard.tsx
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { BannerCardProps } from './interface.ts';

const BannerCard: React.FC<BannerCardProps> = ({
  imageSrc,
  title,
  description,
  buttonLabel,
  buttonColor,
}) => (
  <Card className="bg-white shadow-md">
    <CardMedia
      component="img"
      image={imageSrc}
      alt={title}
      className="h-48 w-full object-cover"
    />
    <CardContent className="p-4">
      <Typography variant="h5" className="text-gray-800">
        {title}
      </Typography>
      <Typography variant="subtitle1" className="text-red-500 mt-2">
        {description}
      </Typography>
      <Button
        variant="contained"
        className={`mt-4 ${buttonColor}`}
        sx={{ textTransform: 'none' }}
      >
        {buttonLabel}
      </Button>
    </CardContent>
  </Card>
);

export default BannerCard;
