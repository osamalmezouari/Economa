import { Box, Typography } from '@mui/material';
import { ServiceCardProps } from './interface';

const ServiceCard = ({ icon, subtitle, title }: ServiceCardProps) => {
  return (
    <Box className="w-full h-max flex gap-2 rounded items-center">
      <Box>{icon}</Box>
      <Box>
        <Typography
          variant="body1"
          className="text-start py-1 text-secondary-darker font-bold font-main"
        >
          {title}
        </Typography>
        <Typography variant="body2" className="w-full text-start">
          {subtitle}{' '}
        </Typography>
      </Box>
    </Box>
  );
};
export default ServiceCard;
