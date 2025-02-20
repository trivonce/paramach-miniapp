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

const AboutUsDrawer = ({children}: {children: React.ReactNode}) => {
    return <Drawer>
    <DrawerTrigger asChild>
        {children}
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Biz haqimizda</DrawerTitle>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Tushunarli</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}

export default AboutUsDrawer