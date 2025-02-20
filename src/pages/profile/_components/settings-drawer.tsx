import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LanguageSelect } from "@/components/inputs";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

const SettingsDrawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sozlamalar</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4 px-5">
                <LanguageSelect />

                <ModeToggle />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Yopish</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
