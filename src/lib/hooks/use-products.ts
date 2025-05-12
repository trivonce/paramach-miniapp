import { useQuery } from "@tanstack/react-query"
import { api } from "../api/config"

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

// interface Category {
//   id: number;
//   name_uz: string;
//   name_ru: string;
//   products: Product[];
// }

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/api/products/")
      return data
    },
  })
} 