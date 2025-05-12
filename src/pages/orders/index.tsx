"use client"

import { useState } from "react"
import {Link} from "react-router-dom"
import { ShoppingBag, Clock } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/lib/hooks/use-orders"
import type { Order } from "@/lib/hooks/use-orders"

export default function OrdersPage() {
  const [_activeTab, setActiveTab] = useState("active")
  const { data: orders = [], isLoading, isError } = useOrders();

  console.log(orders)

  // Split orders into active and history
  const activeOrders = orders.filter((order: Order) => ["pending", "processing"].includes(order.status));
  const orderHistory = orders.filter((order: Order) => ["completed", "cancelled"].includes(order.status));

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <header className="p-4 bg-[#121212] border-b border-gray-800">
        <h1 className="text-lg font-bold text-white">Buyurtmalar</h1>
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="text-white">Yuklanmoqda...</span>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="text-red-500">Buyurtmalarni yuklashda xatolik yuz berdi</span>
              </div>
            ) : activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order: Order) => (
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="text-white">Yuklanmoqda...</span>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="text-red-500">Buyurtmalarni yuklashda xatolik yuz berdi</span>
              </div>
            ) : orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order: Order) => (
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
            <span className="text-white font-medium text-sm">#{order.id}</span>
            <Badge
              className={`
              ${order.status === "pending" ? "bg-yellow-500" : ""}
              ${order.status === "processing" ? "bg-blue-500" : ""}
              text-white
            `}
            >
              <span className="text-xs">{order.statusText}</span>
            </Badge>
          </div>
          <span className="text-gray-400 text-xs">{order.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white text-sm">{order.restaurant}</span>
          <span className="text-green-500 font-medium text-sm">{order.total} so'm</span>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {order.items?.map((item: any, index: number) => (
            <div key={index} className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-xs">{item.quantity}x</span>
                <span className="text-white text-xs">{item.name}</span>
              </div>
              <span className="text-gray-400 text-xs">{item.price} so'm</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-900 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-gray-400 text-xs">Yetkazib berish narxi:</p>
          <p className="text-white text-xs">+20 000 so'm</p>
        </div>
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
            <span className="text-white font-medium text-sm">#{order.id}</span>
            <Badge
              className={`
              ${order.status === "completed" ? "!bg-green-500" : ""}
              ${order.status === "cancelled" ? "bg-red-500" : ""}
              text-white
            `}
            >
              <span className="text-xs">{order.statusText}</span>
            </Badge>
          </div>
          <span className="text-gray-400 text-xs">{order.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white text-sm">{order.restaurant}</span>
          <span className="text-green-500 font-medium text-sm">{order.total} so'm</span>
        </div>
      </div>

      {/* <Link to={`/buyurtmalar/${order.id}`}> */}
      {/*   <div className="p-4 bg-gray-900 flex justify-between items-center"> */}
      {/*     <span className="text-white">Batafsil</span> */}
      {/*     <ChevronRight className="h-5 w-5 text-gray-400" /> */}
      {/*   </div> */}
      {/* </Link> */}
    </div>
  )
}
