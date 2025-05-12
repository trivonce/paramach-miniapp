"use client";

import { useState, useEffect } from "react";
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
import { useLocationStore } from "@/lib/store/location-store";

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

interface LocationProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Location = ({ isOpen: controlledOpen, onOpenChange }: LocationProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setIsOpen = onOpenChange || setUncontrolledOpen;
  const openMap = true; // Always show map, not saved locations
  const { setLocation, location } = useLocationStore();

  // Request geolocation if location is not set and drawer is open
  useEffect(() => {
    if (isOpen && !location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            address: '',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      );
    }
  }, [isOpen, location, setLocation]);

  return (
    <Drawer disablePreventScroll open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DrawerTrigger asChild>
        <button className="bg-brand text-white rounded-2xl px-3 active:scale-90 duration-200 py-3" onClick={() => setIsOpen(true)}>
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

        {/* Only show map, not saved locations */}
        <Map key={"map"} onSelectLocation={(loc) => {
          setLocation(loc);
          setIsOpen(false);
        }} />
      </DrawerContent>
    </Drawer>
  );
};

export default Location;
