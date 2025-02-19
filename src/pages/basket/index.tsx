import { motion } from "framer-motion";

const BasketPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="container"
    >
      Basket
    </motion.main>
  );
};

export default BasketPage;
