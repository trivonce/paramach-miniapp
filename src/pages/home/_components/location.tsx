"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MapPinHouse, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Map from "./map";

const locations = [
  {
    id: 1,
    address: "Toshkent sh. Yunusobod tumani, Sh. Rusaveli ko'chasi 12",
  },
  {
    id: 2,
    address: "Toshkent sh. Yashnobod tumani, Aslonobod ko'chasi 113",
  },
];

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  return (
    <Drawer disablePreventScroll open={isOpen} onOpenChange={setIsOpen} modal={true}>
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

      <DrawerContent className={``}>
        <DrawerHeader>
          <DrawerTitle>Manzilni tanlang</DrawerTitle>
          <DrawerDescription>
            Hozirgi joylashuvingizni tanlang
          </DrawerDescription>
        </DrawerHeader>

        <AnimatePresence mode="wait">
          {openMap ? (
            <Map key={"map"} />
          ) : (
            <motion.div
              key={"locations"}
              initial={false}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -50,
              }}
              className="space-y-2 px-4 pb-4 max-h-[500px] overflow-y-auto"
            >
              {locations.map(({ id, address }) => (
                <div
                  key={id}
                  className="cursor-pointer p-3 dark:bg-gray-900 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition-all text-sm font-medium"
                >
                  {address}
                </div>
              ))}
              <Button
                onClick={() => setOpenMap(!openMap)}
                className="w-full h-12"
              >
                <MapPinHouse size={20} className="shrink-0" />
                Mazil qo'shish
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DrawerContent>
    </Drawer>
  );
};

export default Location;
