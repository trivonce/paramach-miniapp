import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocationStore } from "@/lib/store/location-store";

// components
import Location from "./_components/location";
import AdBanner from "./_components/ad-banner";
// import PopularProducts from "@/components/popular-products";
import Products from "./_components/products";

const HomePage = () => {
  const location = useLocationStore((state) => state.location);
  const [locationDrawerOpen, setLocationDrawerOpen] = useState(false);

  useEffect(() => {
    if (!location) {
      setLocationDrawerOpen(true);
    } else {
      setLocationDrawerOpen(false);
    }
  }, [location]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.2 }}
      className="container py-3 pb-20"
    >
      <Location isOpen={locationDrawerOpen} onOpenChange={setLocationDrawerOpen} />
      <AdBanner />
      {/* <PopularProducts /> */}
      <Products />
    </motion.main>
  );
};

export default HomePage;
