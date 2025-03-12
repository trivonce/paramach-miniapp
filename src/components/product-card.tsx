import { formatPrice } from "@/lib/utils";
import AddButton from "./add-button";

type Props = {
    name?: string;
    price?: number;
    image?: string;
};

const ProductCard = (props: Props) => {
    const {name, price, image} = props

  return (
    <div className="rounded-2xl overflow-hidden shadow-md mb-2 dark:bg-gray-900">
      <div className="relative z-[1] overflow-hidden">
        <img className="absolute top-0 left-0 w-full h-full -z-[1] blur-sm" src={image} alt="placholder_image" />
      <img
        className="h-[140px] w-full object-contain"
        src={image || "https://placehold.co/600x400"}
        alt="paramach"
      />
      </div>

      <div className="px-3 py-2">
        <h1 className="text-tp-main font-medium line-clamp-2 text-sm leading-4 h-8">{name || 'Placeholder'}</h1>
        <p className="text-sm mt-1">{formatPrice(price || 0)}</p>

        <AddButton />
      </div>
    </div>
  );
};

export default ProductCard;
