import React from 'react';
import { Box, Typography, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReviewItemProps } from './interfaces';

const TestimonialCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '24px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  margin: '10px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ReviewItem: React.FC<ReviewItemProps> = ({
  name,
  title,
  text,
  rating,
  avatarUrl,
}) => {
  return (
    <Box sx={{ height: '100%' }}>
      <TestimonialCard>
        <Box sx={{ display: 'flex', mb: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                color: i < rating ? '#FFEB3B' : '#e0e0e0',
                fontSize: '20px',
                mr: 0.5,
              }}
            >
              ★
            </Box>
          ))}
        </Box>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          "{title}"
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, flexGrow: 1 }}
        >
          {text}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatarUrl} alt={name} sx={{ mr: 2 }} />
          <Typography variant="subtitle2">{name}</Typography>
        </Box>
      </TestimonialCard>
    </Box>
  );
};

export default ReviewItem;
