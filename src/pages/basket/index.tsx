import { motion } from "framer-motion";
import Lottie from "lottie-react";
import notFoundLottie from '@/assets/lotties/not_found.json'

const BasketPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="container"
    >
      <Lottie animationData={notFoundLottie} loop={true} />
    </motion.main>
  );
};

export default BasketPage;
