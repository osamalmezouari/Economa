import { Grid } from '@mui/material';
import { BannerCardProps } from '../base/bannerCard/interface';
import BannerCard from '../base/bannerCard/bannerCard';


const bannerData: BannerCardProps[] = [
  {
    imageSrc: 'https://via.placeholder.com/150', // Placeholder image
    title: 'Organic Breakfast',
    description: 'Bacola Weekend Discount',
    buttonLabel: 'Shop Now',
    buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    imageSrc: 'https://via.placeholder.com/150',
    title: 'Organic Baby Food',
    description: 'Bacola Weekend Discount',
    buttonLabel: 'Shop Now',
    buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    imageSrc: 'https://via.placeholder.com/150',
    title: 'Organic Breakfasts',
    description: 'Bacola Weekend Discount',
    buttonLabel: 'Shop Now',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
  },
];

const BannerSection = () => (
  <Grid
    container
    spacing={4}
    className="mx-auto max-w-7xl px-4"
    sx={{ mx: 'auto' }}
  >
    {bannerData.map((card, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <BannerCard {...card} />
      </Grid>
    ))}
  </Grid>
);

export default BannerSection;
