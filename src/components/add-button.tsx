import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import Counter from "./ui/counter";

const MotionButton = motion(Button);

export type AddButtonProps = {
  initialCount?: number;
  minCount?: number;
  maxCount?: number;
  onChange?: (count: number) => void;
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

export const AddButton = ({
  initialCount = 0,
  minCount = 1,
  maxCount = 99,
  onChange,
}: AddButtonProps) => {
  const [count, setCount] = useState(initialCount);
  const isActive = count > 0;

  const handleIncrement = () => {
    setCount((prev) => {
      let newCount;
      if (!isActive) {
        newCount = minCount;
      } else if (prev < maxCount) {
        newCount = prev + 1;
      } else {
        newCount = prev;
      }
      onChange?.(newCount);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      let newCount;
      if (prev === minCount) {
        newCount = 0;
      } else if (prev > minCount) {
        newCount = prev - 1;
      } else {
        newCount = prev;
      }
      onChange?.(newCount);
      return newCount;
    });
  };

  return (
    <div className="flex relative">
      <motion.button
        variants={overlayVariants}
        initial={false}
        animate={isActive ? "active" : "inactive"}
        onClick={handleIncrement}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: isActive ? "none" : "auto" }}
      >
        <span className="text-center text-white flex items-center justify-center text-sm font-semibold">
          Qo'shish
        </span>
      </motion.button>

      <MotionButton
        onClick={handleDecrement}
        className="w-full"
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
        onClick={handleIncrement}
        className="w-full"
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
