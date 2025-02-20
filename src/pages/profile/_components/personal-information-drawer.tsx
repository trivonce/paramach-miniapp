import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  full_name: z.string().min(2, { message: "Ism Familiyani kiriting" }).max(50),
    phone_number: z.string().min(9, { message: "Telefon raqamini kiriting" }).max(13),
});

const PersonalInformationDrawer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DrawerHeader>
              <DrawerTitle>Shaxsiy ma'lumotlar</DrawerTitle>
            </DrawerHeader>

            <div className="space-y-4 px-5">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ism Familiya</FormLabel>
                    <FormControl>
                      <Input placeholder="Ulugbek Temirov" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon raqamingiz</FormLabel>
                    <FormControl>
                      <Input placeholder="+998 93 656 36 72" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter className="flex flex-row items-center justify-center">
              <DrawerClose asChild>
                <Button className="w-full" variant="outline">
                  Bekor qilish
                </Button>
              </DrawerClose>
              <Button className="w-full">Saqlash</Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default PersonalInformationDrawer;
