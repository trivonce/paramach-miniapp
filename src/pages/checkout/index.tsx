"use client";

import { useState } from "react";
// import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Banknote,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle2,
  MapIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { useCreateOrder } from "@/lib/hooks/use-orders";
import { useUserStore } from "@/lib/store/user-store";
import { useLocationStore } from "@/lib/store/location-store";
import { useTranslation } from 'react-i18next';

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Map from "../home/_components/map";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showSuccess, setShowSuccess] = useState(false);
  const items = useCartStore((state) => state.items);
  // const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart);

  const createOrder = useCreateOrder();
  const userId = useUserStore((state) => state.user?.id);
  const locationStore = useLocationStore();
  const location = locationStore.location;
  // For map dialog
  const [mapOpen, setMapOpen] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 20000;

  const handleConfirmOrder = async () => {
    const orderData = {
      address: location?.address || "Toshkent, O'zbekiston",
      phone_number: "+998901234567",
      latitude: location?.latitude || 41.299496,
      longitude: location?.longitude || 69.240073,
      items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    // Debug log for production error
    console.log("Creating order with:", { orderData, telegram_id: userId });

    try {
      await createOrder.mutateAsync({
        orderData,
        telegram_id: userId?.toString() || "",
      });
      clearCart();
      setShowSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/orders");
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-[#121212] bg-gray-100">
      {/* Header */}
      <header className="p-4 dark:bg-[#121212] bg-white border-b dark:border-gray-800 border-gray-200 flex items-center">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="icon"
          className="dark:text-white text-gray-900 mr-2 dark:bg-gray-800 bg-gray-200 size-8"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold dark:text-white text-gray-900 ml-1">
          {t('checkout_title')}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Restaurant Info */}
        <div className="dark:bg-gray-800 bg-white rounded-lg p-4 mb-4">
          <h2 className="dark:text-white text-gray-900 font-medium text-base mb-1">
            Paramach.uz ({t('checkout_branch_name')})
          </h2>
          <h2 className="dark:text-gray-300 text-gray-500 text-xs font-medium mt-3">
            {t('checkout_restaurant_address_label')}
            <span className="font-normal dark:text-gray-400 text-gray-600">
              {t('checkout_restaurant_address')}
            </span>
          </h2>
          {/* <p className="text-gray-300 font-medium text-xs mt-3">
            {t('checkout_estimated_time_label')}
            <span className="font-normal text-gray-400">{t('checkout_estimated_time_value')}</span>
          </p> */}
        </div>

        {/* Order Items */}
        <div className="dark:bg-gray-800 bg-white rounded-lg overflow-hidden mb-4">
          <div className="p-4 dark:border-gray-700 border-gray-200">
            <h2 className="dark:text-white text-gray-900 font-medium mb-3">{t('checkout_order_items')}</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="dark:text-white text-gray-900 text-xs">{item.quantity}x</span>
                    <span className="dark:text-white text-gray-900 text-xs">{item.name}</span>
                  </div>
                  <span className="dark:text-gray-400 text-gray-600 text-xs">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="dark:bg-gray-800 bg-white rounded-lg overflow-hidden mb-4">
          <div className="p-4 border-b dark:border-gray-700 border-gray-200">
            <h2 className="dark:text-white text-gray-900 font-medium mb-3">{t('checkout_delivery_address')}</h2>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 dark:text-gray-400 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="dark:text-white text-gray-900 text-sm">
                  {location?.address || "Toshkent, O'zbekiston"}
                </p>
              </div>
            </div>
          </div>
          <button
            className="p-3 w-full dark:bg-gray-900 bg-gray-100 flex justify-between items-center cursor-pointer"
            onClick={() => setMapOpen(true)}
          >
            <span className="dark:text-white text-gray-900 flex items-center gap-2 text-sm"> <MapIcon className="w-4 h-4" /> {t('checkout_change_address')}</span>
            <ChevronRight className="h-5 w-5 dark:text-gray-400 text-gray-600" />
          </button>
        </div>

        {/* Delivery Time */}
        <div className="dark:bg-gray-800 bg-white rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 dark:text-gray-400 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="dark:text-gray-400 text-gray-600 text-sm">{t('checkout_delivery_time')}</p>
                <p className="dark:text-white text-gray-900 text-xs">{t('checkout_estimated_time_value')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="dark:bg-gray-800 bg-white rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <h2 className="dark:text-white text-gray-900 font-medium mb-3">{t('checkout_payment_method')}</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 dark:bg-gray-900 bg-gray-100 p-3 rounded-lg">
                <RadioGroupItem
                  value="cash"
                  id="cash"
                  className="border-green-500 text-green-500"
                />
                <Label
                  htmlFor="cash"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Banknote className="h-5 w-5 dark:text-gray-400 text-gray-600" />
                  <span className="dark:text-white text-gray-900 text-sm">{t('checkout_cash')}</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div className="dark:bg-gray-800 bg-white rounded-lg overflow-hidden mb-6">
          <div className="p-4">
            <h2 className="dark:text-white text-gray-900 font-medium mb-3">{t('checkout_payment_info')}</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="dark:text-gray-400 text-gray-600 text-xs">{t('checkout_products_price')}</span>
                <span className="dark:text-white text-gray-900 text-xs">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-gray-400 text-gray-600 text-xs">{t('checkout_delivery')}</span>
                <span className="dark:text-white text-gray-900 text-xs">
                  {formatPrice(deliveryFee)}
                </span>
              </div>
              <Separator className="my-2 dark:bg-gray-700 bg-gray-200" />
              <div className="flex justify-between">
                <span className="dark:text-white text-gray-900 font-medium text-sm">{t('checkout_total')}</span>
                <span className="text-green-500 font-medium text-sm">
                  {formatPrice(total + deliveryFee)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white h-11 text-sm"
          onClick={handleConfirmOrder}
          disabled={createOrder.isPending}
        >
          {createOrder.isPending
            ? t('checkout_confirming')
            : t('checkout_confirm')}
        </Button>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-700 text-gray-900 w-[90%] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-900 dark:text-white">
              {t('checkout_success_title')}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="bg-green-500/20 p-4 rounded-full mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <p className="text-center text-gray-900 dark:text-white mb-6">
              {t('checkout_success_desc')}
            </p>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={handleSuccessClose}
            >
              {t('checkout_success_btn')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Map Drawer for changing location */}
      <Drawer open={mapOpen} onOpenChange={setMapOpen}>
        <DrawerContent className="">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl font-bold text-white">
              {t('checkout_select_address')}
            </DrawerTitle>
          </DrawerHeader>
          {/* Map component for selecting location */}
          <div className="mt-4">
            <Map
              onSelectLocation={(loc: {
                latitude: number;
                longitude: number;
                address: string;
              }) => {
                locationStore.setLocation(loc);
                setMapOpen(false);
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
