import { Box, Typography } from '@mui/material';

const HealthSafetyBanner = () => {
  return (
    <Box className="relative overflow-hidden rounded-lg border  bg-primary-lighter w-[1300px] mx-auto p-3 flex flex-wrap items-center justify-between text-left gap-3 bg-opacity-30 my-6">
      {/* Text Column */}
      <Box className="z-10">
        <Typography variant="h5" className="text-primary-darker font-bold font-main ">
          In store or online your health & safety is our top priority
        </Typography>
        <Typography variant="body2" className="text-secondary-lighter font-Inria">
          The only supermarket that makes your life easier, makes you enjoy life
          and makes it better
        </Typography>
      </Box>

      {/* %50 Background Text */}
      <Typography
        component="span"
        className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 text-[100px] font-bold leading-none text-green-50 pointer-events-none select-none"
      >
        %15
      </Typography>

      {/* Image Column */}
      <Box className="relative flex-1">
        <Box
          component="img"
          src="/assets/images/healthSafety.png"
          alt="Health Safety"
          className="absolute -top-24 right-0 max-w-[80%]"
        />
      </Box>

      {/* Overlay link (optional) */}
      <a href="#" className="absolute inset-0 z-0"></a>
    </Box>
  );
};

export default HealthSafetyBanner;
