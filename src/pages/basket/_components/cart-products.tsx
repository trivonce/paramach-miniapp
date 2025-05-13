import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircleFadingPlus, SquareMenu } from "lucide-react";
import { useTranslation } from 'react-i18next';

const CartProducts = () => {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-xl font-semibold mb-2">{t('basket_empty_title')}</h2>
        <p className="text-gray-500">
          {t('basket_empty_add_desc')}
        </p>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-3 min-h-screen">
      <h1 className="font-semibold text-2xl font-baloo text-tp-main mb-4">
        🛒 {t('basket_title')}
      </h1>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-2 left-2 right-2 p-4 bg-white dark:bg-gray-900 rounded-3xl"
      >
        <div className="container flex flex-col gap-3 items-center justify-between">
          <p className="text-xl font-semibold">{formatPrice(totalPrice)}</p>
          <div className="flex gap-2">
            <Button className="bg-teal-500" onClick={() => navigate('/')}>
              <SquareMenu />
              {t('basket_menu')}
            </Button>
            <Button onClick={() => navigate("/checkout")}>
              <CircleFadingPlus />
              {t('basket_checkout')}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartProducts;
