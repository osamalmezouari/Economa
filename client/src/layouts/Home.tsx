import Navbar from '../components/extra/navbar/Navbar';
import HeroImage from '../components/base/hero-image/heroImage';
import CategoryCardContainer from '../components/extra/categoryCardContainer/categoryCardContainer';
import ShoppingCart from '../components/extra/shoppingCart/shoopingCart';
const Home = () => {
  return (
    <>
      <ShoppingCart />
      <Navbar />
      <HeroImage />
      <CategoryCardContainer />
    </>
  );
};

export default Home;
