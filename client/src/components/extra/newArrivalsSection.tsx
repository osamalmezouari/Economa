import ProductnewArrivalsContainer from './productnewArrivalsContainer';
import HeroTitle from './Titles/HeroTitle';

const NewArrivalsSection = () => {
  return (
    <>
      <HeroTitle
        title={'New Arrivals'}
        subtitle={'Shop online for new arrivals and get free shipping!'}
      />
      <ProductnewArrivalsContainer />
    </>
  );
};

export default NewArrivalsSection;
