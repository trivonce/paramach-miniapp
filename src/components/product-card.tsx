import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import Counter from "./ui/counter";

type Props = {
    name?: string;
    price?: number;
    image?: string;
};

const ProductCard = (props: Props) => {
    const {name, price, image} = props

  const [a, setA] = useState(false);
  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setA(false);
    }
  };


  return (
    <div className="rounded-2xl overflow-hidden shadow-md mb-2 dark:bg-gray-900">
      <img
        className="h-[140px] w-full object-cover"
        src={image || "https://placehold.co/600x400"}
        alt="paramach"
      />

      <div className="px-3 py-2">
        <h1 className="text-tp-main font-medium line-clamp-2 text-sm leading-4 h-8">{name || 'Placeholder'}</h1>
        <p className="text-sm mt-1">{formatPrice(price || 0)}</p>

        <div className={`flex relative mt-2`}>
          <motion.button
            initial={false}
            onClick={() => setA(!a)}
            className="absolute top-0 left-0 w-full h-full"
            animate={{ opacity: a ? 0 : 1, scale: a ? 0 : 1 }}
            transition={{ delay: a ? 0 : 0.15 }}
          >
            <span className="text-center text-white flex items-center justify-center text-sm font-semibold">
              Qo'shish
            </span>
          </motion.button>
          <Button
            onClick={handleDecrement}
            className={`w-full ${!a && "rounded-r-none"}`}
          >
            <motion.span animate={{ opacity: a ? 1 : 0 }}>-</motion.span>
          </Button>
          <motion.div
          initial={false}
            animate={{
              scale: a ? 1 : 0,
              opacity: a ? 1 : 0,
              width: a ? "40px" : 0,
              marginInline: a ? "5px" : 0,
            }}
            className={`rounded-xl dark:bg-gray-800 bg-gray-100 text-center flex items-center justify-center font-medium shrink-0 `}
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
          <Button
            onClick={() => setCount(count + 1)}
            className={`w-full ${!a && "rounded-l-none pointer-events-none"}`}
          >
            <motion.span animate={{ opacity: a ? 1 : 0 }}>+</motion.span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
