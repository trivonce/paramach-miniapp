import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

// pages
import HomePage from "./pages/home";
import BasketPage from "./pages/basket";
import OrdersPage from "./pages/orders";
import ProfilePage from "./pages/profile";

// components
import MenuBar from "./components/menu-bar";

// swiper
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Suspense } from "react";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  const { pathname } = useLocation();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AnimatePresence mode="wait">
        <Suspense fallback={<>Loading...</>}>
          <Routes location={pathname} key={pathname}>
            <Route index path="/" element={<HomePage />} />
            <Route index path="/cart" element={<BasketPage />} />
            <Route index path="/orders" element={<OrdersPage />} />
            <Route index path="/profile" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <MenuBar />
    </ThemeProvider>
  );
};

export default App;
