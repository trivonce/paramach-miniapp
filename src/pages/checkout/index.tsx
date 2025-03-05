import { motion } from 'framer-motion';

const CheckoutPage = () => {
    return <motion.main
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.2 }}
    className="container py-3 pb-20"
  >
   Orders
  </motion.main>
}

export default CheckoutPage