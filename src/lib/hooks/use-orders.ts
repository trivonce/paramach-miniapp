import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api } from "../api/config";
import axios from "axios";
import { useUserStore } from "../store/user-store";

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

export interface Order {
  id: string;
  status: string;
  statusText: string;
  date: string;
  restaurant: string;
  total: string;
  deliveryTime?: string;
  items?: { name: string; quantity: number; price: string }[];
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderData, telegram_id }: CreateOrderParams) => {
      const { data } = await api.post(`/api/orders/?telegram_id=${telegram_id}`, orderData);
      return data;
    },
    onSuccess: () => {
      // Invalidate orders query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useOrders() {
  const telegramId = useUserStore((state) => state.user?.id);

  return useQuery<Order[]>({
    queryKey: ["orders", telegramId],
    enabled: !!telegramId,
    queryFn: async () => {
      if (!telegramId) return [];
      const { data } = await axios.get(`/api/orders/?telegram_id=${telegramId}`);
      return data;
    },
  });
} 