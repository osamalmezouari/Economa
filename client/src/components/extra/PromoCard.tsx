import React from 'react';
import PromoCard from '../base/PromoCard/PromoCard-LT';

const PromoCardWraper: React.FC = () => {
  return (
    <div style={{ padding: '20px' }} className='w-[1350px] m-auto'>
      <PromoCard
        image="https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/images/PromoCard.jpg?raw=true"
        title="Fresh Fruits"
        subtitle="Healthy Products"
        discountText=" Hurry up! Grab your 10% off sale now!"
        buttonText="Shop now"
      />
    </div>
  );
};

export default PromoCardWraper;
