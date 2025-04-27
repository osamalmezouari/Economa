import ProductCardContainer from './productCardContainer';
import HeroTitle from './Titles/HeroTitle';

const ProductsWithDiscount = () => {
  return (
    <>
      <HeroTitle
        title={'Day of the deal'}
        subtitle={"Don't wait. The time will never be just right"}
      />
      <ProductCardContainer />
    </>
  );
};
export default ProductsWithDiscount;
