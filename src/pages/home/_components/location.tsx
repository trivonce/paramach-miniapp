"use client";

import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MapPinIcon } from "lucide-react";
import Map from "./map";
import { useLocationStore } from "@/lib/store/location-store";

interface LocationProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Location = ({ isOpen: controlledOpen, onOpenChange }: LocationProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setIsOpen = onOpenChange || setUncontrolledOpen;
  const location = useLocationStore((state) => state.location);
  const setLocation = useLocationStore((state) => state.setLocation);

  return (
    <Drawer disablePreventScroll open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DrawerTrigger asChild>
        <button className="bg-brand text-white rounded-2xl px-3 active:scale-90 duration-200 py-3 w-full" onClick={() => setIsOpen(true)}>
          <div className="flex items-center gap-1 justify-center mb-1">
            <MapPinIcon size={14} className="shrink-0" />
            <h1 className="text-center text-sm">Joriy manzil</h1>
          </div>
          <h1 className="font-medium text-center leading-5">
            {location?.address || "Manzil tanlanmagan"}
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
