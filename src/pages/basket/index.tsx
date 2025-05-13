import { motion } from "framer-motion";
import EmptyCart from "./_components/empty-cart";
import CartProducts from "./_components/cart-products";
import { useCartStore } from "@/lib/store/cart";

const BasketPage = () => {
  const items = useCartStore((state) => state.items);
  const isCartEmpty = items.length === 0;

  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.2 }}
      className="container bg-gray-100 dark:bg-gray-900"
    >
      {isCartEmpty ? <EmptyCart /> : <CartProducts />}
    </motion.main>
  );
};

export default BasketPage;
