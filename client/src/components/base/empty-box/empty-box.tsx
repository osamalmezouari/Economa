import { Box } from '@mui/material';

const EmptyBox = () => {
  return (
    <Box
      component={'img'}
      src="/assets/images/empty-box.png"
      className="h-44 w-44"
    ></Box>
  );
};

export default EmptyBox;
