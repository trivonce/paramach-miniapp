import { motion } from 'framer-motion';
import ActiveOrder from './_components/active-order';
import OrdersHistory from './_components/orders-history'

const Orders = () => {
    return <motion.main
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.2 }}
    className="container py-3 pb-20"
  >
    <h1>Buyurtmalar</h1>

    <ActiveOrder />

    <OrdersHistory />
  </motion.main>
}

export default Orders