import { Box, Typography } from '@mui/material';

const HeroTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Box className={'flex items-center gap-3 my-6 max-w-[1300px] m-auto'}>
      <Typography variant={'h5'} className="text-secondary-main ">
        {title}
      </Typography>
      <p className="text-[12px] text-secondary-light font-Inria mt-1">
        {subtitle}
      </p>
    </Box>
  );
};
export default HeroTitle;
