import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { AnimatePresence } from "framer-motion";
import { Toaster } from 'sonner';

// pages
import HomePage from "./pages/home";
import BasketPage from "./pages/basket";
import OrdersPage from "./pages/orders";
import ProfilePage from "./pages/profile";
import CheckoutPage from "./pages/checkout";

// components
import MenuBar from "./components/menu-bar";

// swiper
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ThemeProvider } from "./components/theme-provider";
import { useTelegram } from "./lib/hooks/use-telegram";
import { useLocationStore } from "./lib/store/location-store";

const App = () => {
  const { pathname } = useLocation();
  useTelegram();
  const getCurrentLocation = useLocationStore((state) => state.getCurrentLocation);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (import.meta.env.VITE_ENV === "development") {
  import("eruda").then((eruda) => {
    eruda.default.init();
  });
}

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
          <Routes location={pathname} key={pathname}>
            <Route index path="/" element={<HomePage />} />
            <Route index path="/cart" element={<BasketPage />} />
            <Route index path="/orders" element={<OrdersPage />} />
            <Route index path="/profile" element={<ProfilePage />} />
            <Route index path="/checkout" element={<CheckoutPage />} />
          </Routes>
      </AnimatePresence>
      <MenuBar />
    </ThemeProvider>
  );
};

export default App;
