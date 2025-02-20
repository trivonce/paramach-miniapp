"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MapPinIcon } from "lucide-react";

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button className="bg-brand text-white rounded-2xl px-3 active:scale-90 duration-200 py-3">
            <div className="flex items-center gap-1 justify-center mb-1">
              <MapPinIcon size={14} className="shrink-0" />
              <h1 className="text-center text-sm">Joriy manzil</h1>
            </div>
            <h1 className="font-medium text-center leading-5">
              Toshkent sh. Yunusobod tumani, Sh. Rusaveli ko'chasi 12
            </h1>
          </button>
        </DrawerTrigger>

        <DrawerContent className="p-4 pt-0">
          {" "}
          <h2 className="text-lg font-semibold text-center">
            Manzilni tanlang
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Hozirgi joylashuvingizni tanlang
          </p>
          <div className="mt-4 space-y-2">
            {["Toshkent", "Samarqand", "Buxoro"].map((city) => (
              <motion.div
                key={city}
                layout
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer p-3 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition-all"
              >
                {city}
              </motion.div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
  );
};

export default Location;
