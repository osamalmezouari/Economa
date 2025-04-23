import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { CategoryCardProps } from '../../types/category';

const CategoryCardSingle = ({
  svgLink,
  productsCount,
  name,
}: CategoryCardProps) => {
  return (
    <Box component={'div'} className={``}>
      <Box className="w-[160px] border-[1px]">
        <Box
          component={'div'}
          className="p-4 text-center grid justify-center gap-y-1"
        >
          <Box
            component={'img'}
            className="w-28 m-auto h-28 bg-cover bg-center hover:opacity-75 cursor-pointer"
            src={svgLink}
          ></Box>
          <Typography className="text-[12px] font-main font-bold text-secondary-darker">
            {name}
          </Typography>
          <p className="text-[12px] text-secondary-main">
            {productsCount} Products
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryCardSingle;
