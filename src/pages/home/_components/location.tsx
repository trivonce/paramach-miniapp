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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Drawer disablePreventScroll open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DrawerTrigger asChild>
        <button className="bg-brand text-white rounded-2xl px-3 active:scale-90 duration-200 py-3 w-full" onClick={() => setIsOpen(true)}>
          <div className="flex items-center gap-1 justify-center mb-1">
            <MapPinIcon size={14} className="shrink-0" />
            <h1 className="text-center text-sm">{t('current_address')}</h1>
          </div>
          <h1 className="font-medium text-center leading-5">
            {location?.address || t('address_not_selected')}
          </h1>
        </button>
      </DrawerTrigger>

      <DrawerContent className={``}>
        <DrawerHeader>
          <DrawerTitle>{t('select_address')}</DrawerTitle>
          <DrawerDescription>
            {t('select_current_location')}
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
