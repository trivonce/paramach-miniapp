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
import { useTranslation } from 'react-i18next';

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
  full_name: z.string().min(2, { message: 'profile_enter_fullname' }).max(50),
  phone_number: z.string().min(9, { message: 'profile_enter_phone' }).max(13),
});

const PersonalInformationDrawer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
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
              <DrawerTitle>{t('profile_personal_info')}</DrawerTitle>
            </DrawerHeader>

            <div className="space-y-4 px-5">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile_fullname')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('profile_fullname_placeholder')} {...field} />
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
                    <FormLabel>{t('profile_phone')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('profile_phone_placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter className="flex flex-row items-center justify-center">
              <DrawerClose asChild>
                <Button className="w-full" variant="outline">
                  {t('profile_cancel')}
                </Button>
              </DrawerClose>
              <Button className="w-full">{t('profile_save')}</Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default PersonalInformationDrawer;
