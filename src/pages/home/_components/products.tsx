import ProductCard from "@/components/product-card";
import { products } from "@/db/products";

const Products = () => {
  return (
    <div className=" mt-5">
      <div className="flex flex-col gap-3 mt-2">
        {products.map((el: any, index: number) => {
          return (
            <div key={index}>
              <h1 className="font-semibold text-2xl font-baloo text-tp-main mb-2">
                {el.name}
              </h1>
              <div className="grid grid-cols-2 gap-3">
                {el.products.map((product: any, index: number) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
