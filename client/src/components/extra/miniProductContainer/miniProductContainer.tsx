import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MiniProductCardTypeProps } from '../../base/minProductCard/interfaces';
import MiniProductCard from '../../base/minProductCard/miniProductCart';

interface MiniProductContainerProps {
  products: MiniProductCardTypeProps[];
}

const MiniProductContainer: React.FC<MiniProductContainerProps> = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mini-product-container p-4 max-w-[1200px] mx-auto">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.productId} className="px-2">
            <MiniProductCard {...product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MiniProductContainer;