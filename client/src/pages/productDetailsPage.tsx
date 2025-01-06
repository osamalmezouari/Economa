import ProductsDetails from '../layouts/ProductsDetails';
import MiniProductContainer from '../components/extra/miniProductContainer/miniProductContainer';
import { useParams } from '@tanstack/react-router';
import ReviewContainer from '../components/extra/reviewContainer/reviewContainer';
import { ProductDetailsParams } from '../types/product';
import HighlyRightedProductSection from '../layouts/HighlyRightedProductSection';

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
