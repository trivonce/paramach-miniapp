import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { LanguageSelect } from "@/components/inputs";
import { ModeToggle } from "@/components/mode-toggle";
import { useTranslation } from 'react-i18next';

const SettingsDrawer = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('profile_settings')}</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4 px-5 pb-10">
          <LanguageSelect />

          <ModeToggle />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
