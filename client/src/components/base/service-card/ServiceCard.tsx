import { Box } from '@mui/material';
import { ServiceCardProps } from './interface';

const ServiceCard = ({ icon, subtitle }: ServiceCardProps) => {
  return (
    <Box className="w-full h-[140px] p-6 flex place-items-center border-gray-200 border-2 rounded text-center">
      <>{icon}</>
      <p className="text-start px-4 py-1 text-secondary-main font-normal text-xl font-primay">
        {subtitle}
      </p>
    </Box>
  );
};
export default ServiceCard;
