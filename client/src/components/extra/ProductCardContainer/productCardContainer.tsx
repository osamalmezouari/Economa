import Slider from 'react-slick';
import ProductCard from '../../base/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getproductsCards } from '../../../features/products/productThunk';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';

const ProductCardContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsCard } = useSelector((state: RootState) => state.products);
  const { loading, data } = productsCard;

  useEffect(() => {
    dispatch(getproductsCards());
  }, [dispatch]);


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="slider-container"
      style={{ margin: 'auto', maxWidth: '1200px', padding: '20px' }}
    >
      {loading ? (
        'Loading...'
      ) : (
        <Slider {...settings}>
          {data.map((productCard) => (
            <div key={productCard.id} style={{ padding: '0 10px' }}>
              <ProductCard
                id={productCard.id}
                discount={productCard.discount}
                name={productCard.name}
                categoryName={productCard.categoryName}
                description={productCard.description}
                productAvgRaiting={productCard.productAvgRaiting}
                price={productCard.price}
                priceWithDiscount={productCard.priceWithDiscount}
                unit={productCard.unit}
                imageLink={productCard.imageLink}
              />
            </div>
          ))}
          
        </Slider>
      )}
    </div>
  );
};

export default ProductCardContainer;
