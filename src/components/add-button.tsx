import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Counter from "./ui/counter";
import { useCartStore } from "@/lib/store/cart";
import { useTranslation } from 'react-i18next';

const MotionButton = motion(Button);

export type AddButtonProps = {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  minCount?: number;
  maxCount?: number;
  onChange?: (count: number) => void;
  className?: string;
};

const PILL_RADIUS = 20;

const leftButtonVariants = {
  inactive: {
    borderTopLeftRadius: PILL_RADIUS,
    borderTopRightRadius: PILL_RADIUS,
    borderBottomRightRadius: PILL_RADIUS,
    borderBottomLeftRadius: PILL_RADIUS,
  },
  active: {
    borderTopLeftRadius: PILL_RADIUS,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: PILL_RADIUS,
  },
};

const rightButtonVariants = {
  inactive: {
    borderTopLeftRadius: PILL_RADIUS,
    borderTopRightRadius: PILL_RADIUS,
    borderBottomRightRadius: PILL_RADIUS,
    borderBottomLeftRadius: PILL_RADIUS,
  },
  active: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: PILL_RADIUS,
    borderBottomRightRadius: PILL_RADIUS,
    borderBottomLeftRadius: 0,
  },
};

const overlayVariants = {
  active: {
    opacity: 0,
    scale: 0,
    transition: { delay: 0 },
  },
  inactive: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.15 },
  },
};

const AddButton = ({
  id,
  name,
  price,
  image,
  minCount = 0,
  maxCount = 99,
  onChange,
  className,
}: AddButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartStore((state) => state.items);
  const currentItem = items.find((item) => item.id === id);
  const count = currentItem?.quantity || 0;
  const isActive = count > 0;
  const { t } = useTranslation();

  const handleIncrement = () => {
    if (!id || !name || !price || !image) return;

    if (!isActive) {
      addItem({ id, name, price, image });
      onChange?.(1);
    } else {
      const newCount = count + 1;
      if (newCount <= maxCount) {
        updateQuantity(id, newCount);
        onChange?.(newCount);
      }
    }
  };

  const handleDecrement = () => {
    if (!id) return;

    const newCount = count - 1;
    if (newCount >= minCount) {
      updateQuantity(id, newCount);
      onChange?.(newCount);
    } else {
      removeItem(id);
      onChange?.(0);
    }
  };

  return (
    <div className={`flex relative ${className}`}>
      <motion.button
        variants={overlayVariants}
        initial={false}
        animate={isActive ? "active" : "inactive"}
        onClick={handleIncrement}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: isActive ? "none" : "auto" }}
      >
        <span className="text-center text-white flex items-center justify-center text-sm font-semibold h-full">
          {t('add_to_cart')}
        </span>
      </motion.button>

      <MotionButton
        size='sm'
        onClick={handleDecrement}
        className="w-full h-8"
        variants={leftButtonVariants}
        initial={false}
        animate={!isActive ? "active" : "inactive"}
        transition={{ duration: 0.3 }}
      >
        <motion.span animate={{ opacity: isActive ? 1 : 0 }}>-</motion.span>
      </MotionButton>

      <motion.div
        initial={false}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
          width: isActive ? "40px" : 0,
          marginInline: isActive ? "5px" : 0,
        }}
        style={{ borderRadius: 12 }}
        className="dark:bg-gray-800 bg-gray-100 text-center flex items-center justify-center font-medium shrink-0"
      >
        <Counter
          value={count}
          places={[10, 1]}
          fontSize={14}
          padding={10}
          gap={0}
          fontWeight={600}
        />
      </motion.div>

      <MotionButton
        size='sm'
        onClick={handleIncrement}
        className="w-full h-8"
        variants={rightButtonVariants}
        initial={false}
        animate={!isActive ? "active" : "inactive"}
        transition={{ duration: 0.3 }}
      >
        <motion.span animate={{ opacity: isActive ? 1 : 0 }}>+</motion.span>
      </MotionButton>
    </div>
  );
};

export default AddButton;
