import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { LanguageSelect } from "@/components/inputs";
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
