import { useParams } from '@tanstack/react-router';
import ReviewContainer from '../components/extra/reviewContainer/reviewContainer';
import { ProductDetailsParams } from '../types/product';
import MiniProductContainer from '../components/extra/miniProductContainer';
import HighlyRightedProductSection from '../components/extra/HighlyRightedProductSection';
import ProductsDetails from '../components/extra/ProductsDetails';

const ProductDetailsPage = () => {
  const { ProductId } = useParams({ strict: false }) as ProductDetailsParams;

  return (
    <>
      <ProductsDetails ProductId={ProductId} />
      <MiniProductContainer />
      <ReviewContainer productId={ProductId} />
      <HighlyRightedProductSection />
    </>
  );
};

export default ProductDetailsPage;
