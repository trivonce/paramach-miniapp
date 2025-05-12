import ProductCard from "@/components/product-card";
import { useProducts } from "@/lib/hooks/use-products";

interface Product {
  id: number;
  category_name_uz: string;
  category_name_ru: string;
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  price: string;
  image: string;
  is_available: boolean;
  is_popular: boolean;
  created_at: string;
  category: number;
}

const Products = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="mt-5">
        <div className="flex flex-col gap-3 mt-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-[200px] bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 text-center">
        <p className="text-red-500">Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.</p>
      </div>
    );
  }

  // Group products by category
  const groupedProducts = products?.reduce((acc, product) => {
    const categoryId = product.category;
    if (!acc[categoryId]) {
      acc[categoryId] = {
        id: categoryId,
        name_uz: product.category_name_uz,
        name_ru: product.category_name_ru,
        products: [],
      };
    }
    acc[categoryId].products.push(product);
    return acc;
  }, {} as Record<number, { id: number; name_uz: string; name_ru: string; products: Product[] }>);

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3 mt-2">
        {groupedProducts && Object.values(groupedProducts).map((category) => (
          <div key={category.id}>
            <h1 className="font-semibold text-2xl font-baloo text-tp-main mb-2">
              {category.name_uz}
            </h1>
            <div className="grid grid-cols-2 gap-3">
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name_uz}
                  price={parseFloat(product.price)}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
