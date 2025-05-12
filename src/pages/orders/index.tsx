"use client"

import { useState } from "react"
import {Link} from "react-router-dom"
import { ChevronRight, Home, ShoppingBag, List, User, Clock } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <header className="p-4 bg-[#121212] border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">Buyurtmalar</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 rounded-lg">
            <TabsTrigger
              value="active"
              className="rounded-md data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Faol buyurtmalar
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-md data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Buyurtmalar tarixi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4">
            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <ActiveOrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Faol buyurtmalar yo'q</h3>
                <p className="text-gray-400 mb-6">Hozirda faol buyurtmalaringiz yo'q</p>
                <Link to="/">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">Buyurtma berish</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <OrderHistoryCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Clock className="w-16 h-16 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Buyurtmalar tarixi bo'sh</h3>
                <p className="text-gray-400 mb-6">Siz hali buyurtma bermadingiz</p>
                <Link to="/">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">Buyurtma berish</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ActiveOrderCard({ order }: any) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">#{order.id}</span>
            <Badge
              className={`
              ${order.status === "pending" ? "bg-yellow-500" : ""}
              ${order.status === "processing" ? "bg-blue-500" : ""}
              ${order.status === "delivering" ? "bg-purple-500" : ""}
              text-white
            `}
            >
              {order.statusText}
            </Badge>
          </div>
          <span className="text-gray-400 text-sm">{order.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white">{order.restaurant}</span>
          <span className="text-green-500 font-medium">{order.total} so'm</span>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white">{item.quantity}x</span>
                <span className="text-white">{item.name}</span>
              </div>
              <span className="text-gray-400">{item.price} so'm</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-900 flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">Yetkazib berish vaqti</p>
          <p className="text-white">{order.deliveryTime}</p>
        </div>
        <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
          Kuzatish
        </Button>
      </div>
    </div>
  )
}

function OrderHistoryCard({ order }: any) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">#{order.id}</span>
            <Badge
              className={`
              ${order.status === "delivered" ? "bg-green-500" : ""}
              ${order.status === "cancelled" ? "bg-red-500" : ""}
              text-white
            `}
            >
              {order.statusText}
            </Badge>
          </div>
          <span className="text-gray-400 text-sm">{order.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white">{order.restaurant}</span>
          <span className="text-green-500 font-medium">{order.total} so'm</span>
        </div>
      </div>

      <Link to={`/buyurtmalar/${order.id}`}>
        <div className="p-4 bg-gray-900 flex justify-between items-center">
          <span className="text-white">Batafsil</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </Link>
    </div>
  )
}

// Sample data
const activeOrders = [
  {
    id: "2305",
    status: "pending",
    statusText: "Kutilmoqda",
    date: "12.05.2025",
    restaurant: "Burger King",
    total: "89,000",
    deliveryTime: "30-40 daqiqa",
    items: [
      { name: "Whopper", quantity: 2, price: "45,000" },
      { name: "Coca-Cola", quantity: 1, price: "9,000" },
      { name: "Kartoshka fri", quantity: 1, price: "15,000" },
    ],
  },
  {
    id: "2304",
    status: "delivering",
    statusText: "Yetkazilmoqda",
    date: "12.05.2025",
    restaurant: "KFC",
    total: "75,000",
    deliveryTime: "10-15 daqiqa",
    items: [
      { name: "Tovuq qanotchalari", quantity: 1, price: "45,000" },
      { name: "Pepsi", quantity: 2, price: "18,000" },
      { name: "Kartoshka fri", quantity: 1, price: "12,000" },
    ],
  },
]

const orderHistory = [
  {
    id: "2303",
    status: "delivered",
    statusText: "Yetkazildi",
    date: "11.05.2025",
    restaurant: "Evos",
    total: "65,000",
  },
  {
    id: "2302",
    status: "delivered",
    statusText: "Yetkazildi",
    date: "10.05.2025",
    restaurant: "Max Way",
    total: "120,000",
  },
  {
    id: "2301",
    status: "cancelled",
    statusText: "Bekor qilindi",
    date: "09.05.2025",
    restaurant: "Burger King",
    total: "95,000",
  },
]
