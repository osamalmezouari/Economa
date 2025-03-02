import { Box } from '@mui/material';

const EmptyBox = () => {
  return (
    <Box
      component={'img'}
      src="/assets/images/empty-box.svg"
      className="h-44 w-44 m-auto"
    ></Box>
  );
};

export default EmptyBox;
