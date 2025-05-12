import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api } from "../api/config";
import axios from "axios";
import { useUserStore } from "../store/user-store";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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

function getStatusText(status: string) {
  switch (status) {
    case "pending": return "Kutilmoqda";
    case "processing": return "Qabul qilindi";
    case "completed": return "Yetkazildi";
    case "cancelled": return "Bekor qilindi";
    default: return status;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("uz-UZ");
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderData, telegram_id }: CreateOrderParams) => {
      const { data } = await api.post(`${API_BASE_URL}/api/orders/?telegram_id=${telegram_id}`, orderData);
      return data;
    },
    onSuccess: () => {
      // Invalidate orders query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useOrders() {
  const telegramId = useUserStore((state) => state.user?.id) || "7468341931";

  return useQuery({
    queryKey: ["orders", telegramId],
    enabled: !!telegramId,
    queryFn: async () => {
      if (!telegramId) return [];
      const { data } = await axios.get(`${API_BASE_URL}/api/orders/?telegram_id=${telegramId}`);
      // Map backend data to UI format
      return data.map((order: any) => ({
        id: order.id,
        status: order.status,
        statusText: getStatusText(order.status),
        date: formatDate(order.created_at),
        restaurant: order.address, // or use another field if you have restaurant name
        total: order.total_price,
        deliveryTime: "", // If you have delivery time, map it here
        items: order.items.map((item: any) => ({
          name: item.product_detail?.name_uz || "Noma'lum",
          quantity: item.quantity,
          price: item.price,
        })),
      }));
    },
  });
} 