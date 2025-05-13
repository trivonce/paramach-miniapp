import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { useTranslation } from 'react-i18next';

const AboutUsDrawer = ({children}: {children: React.ReactNode}) => {
    const { t } = useTranslation();
    return <Drawer>
    <DrawerTrigger asChild>
        {children}
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{t('profile_about_us')}</DrawerTitle>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">{t('profile_understood')}</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}

export default AboutUsDrawer