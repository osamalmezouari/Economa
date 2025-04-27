import React from 'react';
import CategoryCardContainer from './categoryCardContainer';
import { Box } from '@mui/material';
import PromoCardlefttitlelarge from '../base/PromoCard/PromoCard-LTL';
import PageHeader from '../admin/base/pageheader/PageHeader';

const StoreTopSection: React.FC = () => {
  return (
    <>
      <PageHeader
        title=""
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Store', href: '/store' },
        ]}
        className="px-4 my-2"
      />
      <Box>
        <PromoCardlefttitlelarge
          image="/assets/images/banner-08.jpg"
          title="Fresh Groceries Delivered!"
          subtitle="Get the best quality fruits, veggies, and more"
          discountText="Up to 30% Off This Week"
          buttonText="Shop Now"
        />
      </Box>
      <CategoryCardContainer />
    </>
  );
};

export default StoreTopSection;
