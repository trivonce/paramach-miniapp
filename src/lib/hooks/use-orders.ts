import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/config";

interface OrderItem {
  product_id: number;
  quantity: number;
}

interface OrderData {
  address: string;
  phone_number: string;
  latitude: number;
  longitude: number;
  items: OrderItem[];
}

interface CreateOrderParams {
  orderData: OrderData;
  telegram_id: string;
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderData, telegram_id }: CreateOrderParams) => {
      const { data } = await api.post(`/api/orders/create/?telegram_id=${telegram_id}`, orderData);
      return data;
    },
    onSuccess: () => {
      // Invalidate orders query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
} 