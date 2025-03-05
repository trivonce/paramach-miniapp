import { motion } from "framer-motion";
import EmptyCart from "./_components/empty-cart";
import CartProducts from "./_components/cart-products";


const BasketPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.2 }}
      className="container"
    >
      {/* <EmptyCart /> */}

      <CartProducts />
    </motion.main>
  );
};

export default BasketPage;
