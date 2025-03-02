import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { CategoryCardProps } from '../../../types/category';

const CategoryCardSingle = ({
  svgLink,
  productsCount,
  name,
}: CategoryCardProps) => {
  const calors: string[] = [
    '#e2fde2',
    '#fee9e8',
    '#fdf4ea',
    '#F9DEF2',
    'fdf5eb',
  ];
  const randomColor = calors[Math.floor(Math.random() * calors.length)];
  return (
    <Box
      component={'div'}
      className={`p-3 rounded`}
      style={{ backgroundColor: `${randomColor}` }}
    >
      <Card className="w-[160px]">
        <Box
          component={'div'}
          className="p-4 text-center grid justify-center gap-y-1"
        >
          <Box
            component={'div'}
            className="w-12 m-auto h-12 bg-cover bg-center"
            style={{
              backgroundImage: `url(${svgLink})`,
            }} /* onClick={()=>Navigate(linkTo)} */
          ></Box>
          <Typography className="!font-main font-bold text-secondary-darker">
            {name}
          </Typography>
          <p className="text-[12px] text-secondary-main">
            {productsCount} Products
          </p>
        </Box>
      </Card>
    </Box>
  );
};

export default CategoryCardSingle;
