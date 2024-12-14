import Navbar from '../components/extra/navbar/Navbar';
import HeroImage from '../components/base/hero-image/heroImage';
import CategoryCardContainer from '../components/extra/categoryCardContainer/categoryCardContainer';
import ShoppingCart from '../components/extra/shoppingCart/shoopingCart';
import Wishlist from '../components/extra/wishlist/wishlist.tsx';
const Home = () => {
  return (
    <>
      <ShoppingCart />
      <Wishlist />
      <Navbar />
      <HeroImage />
      <CategoryCardContainer />
    </>
  );
};

export default Home;
