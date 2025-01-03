import ProductsDetails from '../layouts/ProductsDetails';
import MiniProductContainer from '../components/extra/miniProductContainer/miniProductContainer';
import { useParams } from '@tanstack/react-router';
import { MiniProductCardTypeProps } from '../components/base/minProductCard/interfaces';
import ReviewCard from '../components/base/reviewCard/reviewCard';
import ReviewContainer from '../components/extra/reviewContainer/reviewContainer';

interface ProductDetailsParams {
  ProductId: string;
}

const productsdata: MiniProductCardTypeProps[] = [
  {
    name: 'Roasted Almonds Pack',
    priceWithDiscount: 16.0,
    price: 23.0,
    svgLink: '/assets/products/bakery/product1.jpg',
    productAvgRating: 4.5,
    productId: '1',
  },
  {
    name: 'Homey Spiced Nuts',
    priceWithDiscount: 32.0,
    price: 45.0,
    svgLink: '/assets/products/bakery/product2.jpg',
    productAvgRating: 4.0,
    productId: '2',
  },
  {
    name: 'Dates Value Pouch',
    priceWithDiscount: 56.0,
    price: 60.0,
    svgLink: '/assets/products/bakery/product3.jpg',
    productAvgRating: 5.0,
    productId: '3',
  },
  {
    name: 'Berries Pack',
    priceWithDiscount: 45.0,
    price: 56.0,
    svgLink: '/assets/products/bakery/product4.jpg',
    productAvgRating: 4.7,
    productId: '4',
  },
];

const ProductDetailsPage = () => {
  const { ProductId } = useParams({ strict: false }) as ProductDetailsParams;

  return (
    <>
      <ProductsDetails ProductId={ProductId} />
      <MiniProductContainer products={productsdata} />
      <ReviewContainer />
    </>
  );
};

export default ProductDetailsPage;
