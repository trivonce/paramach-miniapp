import { Button } from "./button";
import { motion } from "framer-motion";

interface CartCounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}

const CartCounter = ({ value, onIncrement, onDecrement, className }: CartCounterProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrement}
      >
        -
      </Button>
      <span className="w-8 text-center font-medium">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
  );
};

export default CartCounter; 