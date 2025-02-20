import { motion } from "framer-motion";

// components
import Location from "./_components/location";
import AdBanner from "./_components/ad-banner";
import PopularProducts from "./_components/popular-products";
import Products from "./_components/products";

const HomePage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="container py-3 pb-20"
    >
      <Location />
      <AdBanner />
      <PopularProducts />
      <Products />
    </motion.main>
  );
};

export default HomePage;
