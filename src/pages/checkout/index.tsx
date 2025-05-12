"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Banknote, MapPin, Clock, ChevronRight, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "@/lib/store/cart-store"
import { formatPrice } from "@/lib/utils"
import { useCreateOrder } from "@/lib/hooks/use-orders"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [showSuccess, setShowSuccess] = useState(false)
  const items = useCartStore((state) => state.items)
  // const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  const createOrder = useCreateOrder()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 20000

  const handleConfirmOrder = async () => {
    const orderData = {
      address: "123 Main Street, Tashkent", // This should come from user input
      phone_number: "+998901234567", // This should come from user input
      latitude: 41.299496,
      longitude: 69.240073,
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    }

    try {
      await createOrder.mutateAsync({ 
        orderData,
        telegram_id: "7468341931" // This should come from user context or config
      })
      clearCart()
      setShowSuccess(true)
    } catch (error) {
      console.error("Error placing order:", error)
      // You might want to show an error message to the user here
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    navigate("/orders")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="p-4 bg-[#121212] border-b border-gray-800 flex items-center">
        <Button onClick={() => navigate(-1)} variant="ghost" size="icon" className="text-white mr-2 bg-gray-800 size-8">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-white ml-1">Buyurtmani tasdiqlash</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Restaurant Info */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h2 className="text-white font-medium text-lg mb-1">Sergeli Paramach</h2>
          <p className="text-gray-400 text-sm">30-40 daqiqa</p>
        </div>

        {/* Order Items */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
          <div className="p-4 border-gray-700">
            <h2 className="text-white font-medium mb-3">Buyurtma tarkibi</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white">{item.quantity}x</span>
                    <span className="text-white">{item.name}</span>
                  </div>
                  <span className="text-gray-400">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white font-medium mb-3">Yetkazib berish manzili</h2>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white">Toshkent sh. Yunusobod tumani, Sh. Rustaveli ko'chasi 12</p>
                <p className="text-gray-400 text-sm mt-1">Uy, kvartira: 42</p>
              </div>
            </div>
          </div>

          <Link to="/address">
            <div className="p-4 bg-gray-900 flex justify-between items-center">
              <span className="text-white">Manzilni o'zgartirish</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Delivery Time */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Yetkazib berish vaqti</p>
                <p className="text-white">30-40 daqiqa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <h2 className="text-white font-medium mb-3">To'lov usuli</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className="flex items-center space-x-3 bg-gray-900 p-3 rounded-lg">
                <RadioGroupItem value="cash" id="cash" className="border-green-500 text-green-500" />
                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                  <Banknote className="h-5 w-5 text-gray-400" />
                  <span className="text-white">Naqd pul</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
          <div className="p-4">
            <h2 className="text-white font-medium mb-3">To'lov ma'lumotlari</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Mahsulotlar narxi</span>
                <span className="text-white">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Yetkazib berish</span>
                <span className="text-white">{formatPrice(deliveryFee)}</span>
              </div>
              <Separator className="my-2 bg-gray-700" />
              <div className="flex justify-between">
                <span className="text-white font-medium">Jami</span>
                <span className="text-green-500 font-medium">{formatPrice(total + deliveryFee)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-md"
          onClick={handleConfirmOrder}
          disabled={createOrder.isPending}
        >
          {createOrder.isPending ? "Buyurtma tasdiqlanmoqda..." : "Buyurtmani tasdiqlash"}
        </Button>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white w-[90%] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-white">Buyurtma qabul qilindi!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="bg-green-500/20 p-4 rounded-full mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <p className="text-center text-gray-300 mb-6">
              Sizning buyurtmangiz muvaffaqiyatli qabul qilindi. Buyurtma holati haqida ma'lumotni "Buyurtmalar"
              bo'limida ko'rishingiz mumkin.
            </p>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={handleSuccessClose}>
              Buyurtmalarni ko'rish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}