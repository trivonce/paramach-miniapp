import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import Counter from "./ui/counter";

export type AddButtonProps = {
  initialCount?: number;
  minCount?: number;
  maxCount?: number;
  onChange?: (count: number) => void;
};

export const AddButton = ({
  initialCount = 1,
  minCount = 1,
  maxCount = 99,
  onChange,
}: AddButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleDecrement = () => {
    setCount((prev) => {
      const newCount = prev > minCount ? prev - 1 : prev;
      if (newCount === minCount) setIsActive(false);
      onChange?.(newCount);
      return newCount;
    });
  };

  const handleIncrement = () => {
    setCount((prev) => {
      const newCount = prev < maxCount ? prev + 1 : prev;
      onChange?.(newCount);
      return newCount;
    });
  };

  return (
    <div className="flex relative mt-2">
      <motion.button
        initial={false}
        onClick={() => setIsActive(true)}
        className="absolute top-0 left-0 w-full h-full"
        animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }}
        transition={{ delay: isActive ? 0 : 0.15 }}
      >
        <span className="text-center text-white flex items-center justify-center text-sm font-semibold">
          Qo'shish
        </span>
      </motion.button>
      <Button
        onClick={handleDecrement}
        className={`w-full ${!isActive && "rounded-r-none"}`}
      >
        <motion.span animate={{ opacity: isActive ? 1 : 0 }}>-</motion.span>
      </Button>
      <motion.div
        initial={false}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
          width: isActive ? "40px" : 0,
          marginInline: isActive ? "5px" : 0,
        }}
        className="rounded-xl dark:bg-gray-800 bg-gray-100 text-center flex items-center justify-center font-medium shrink-0"
      >
        <Counter value={count} places={[10, 1]} fontSize={14} padding={10} gap={0} fontWeight={600} />
      </motion.div>
      <Button
        onClick={handleIncrement}
        className={`w-full ${!isActive && "rounded-l-none pointer-events-none"}`}
      >
        <motion.span animate={{ opacity: isActive ? 1 : 0 }}>+</motion.span>
      </Button>
    </div>
  );
};

export default AddButton;
