import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CameraIcon,
  InfoIcon,
  NewspaperIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronRight,
  // CircleUserRound,
} from "lucide-react";
// import PersonalInformationDrawer from "./_components/personal-information-drawer";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import SettingsDrawer from "./_components/settings-drawer";
import AboutUsDrawer from "./_components/about-us-drawer";
import { useUserStore } from "@/lib/store/user-store";

const settings = [
  // {
  //   id: "1",
  //   title: "Shaxsiy ma'lumotlarim",
  //   wrapper: PersonalInformationDrawer,
  //   icon: CircleUserRound,
  // },
  {
    id: "2",
    title: "Xabar va yangiliklar",
    action: () => window.open("https://t.me/paramach_uz", "_blank"),
    icon: NewspaperIcon,
  },
  {
    id: "3",
    title: "Biz haqimizda",
    wrapper: AboutUsDrawer,
    icon: InfoIcon,
  },
  {
    id: "4",
    title: "Sozlamalar",
    wrapper: SettingsDrawer,
    icon: SettingsIcon,
  },
  {
    id: "5",
    title: "Chiqish",
    icon: LogOutIcon,
  },
];

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -50,
      }}
      transition={{ duration: 0.2 }}
      className=" pt-3 dark:bg-background bg-gray-100 min-h-screen"
    >
      <div className="container">
        <div className="flex items-center gap-5 dark:bg-gray-900 bg-white rounded-xl p-3">
          <span className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={user?.photo_url || "https://avatar.iran.liara.run/public/38"}
                alt={user?.first_name || "@user"}
              />
              <AvatarFallback>
                {user?.first_name?.[0] || "Dev"}
                {user?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <input
              accept="image/*"
              hidden
              type="file"
              name="avatar"
              id="avatar"
            />
            <label
              htmlFor="avatar"
              className="bg-brand text-white w-8 h-8 flex items-center justify-center absolute bottom-0 right-0 rounded-full active:scale-90 duration-200"
            >
              <CameraIcon size={18} />
            </label>
          </span>

          <div>
            <h1 className="text-xl font-semibold">
              {user?.first_name || "Dev"} {user?.last_name || "User"}
            </h1>
            <p className="dark:text-gray-400 text-tp-main">
              {user?.id ? `@${user.id}` : "@default_id"}
            </p>
          </div>
        </div>

        <div className="dark:bg-gray-900 bg-white mt-3 rounded-xl flex flex-col">
          {settings.map(({ id, title, icon: Icon, wrapper, action }) => {
            const Comp = wrapper || Slot;
            return (
              <Comp key={id}>
                <button
                  onClick={action}
                  className="flex items-center justify-between px-4 border-b  py-3 last:border-none group"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={24} />
                    <h1 className="">{title}</h1>
                  </span>

                  <ChevronRight
                    className="text-tp-main group-active:translate-x-3 duration-200"
                    size={24}
                  />
                </button>
              </Comp>
            );
          })}
        </div>

        <div className="dark:bg-gray-900 bg-white rounded-xl mt-3 p-3">
          Aloqa markazi: <a href="tel:+998936563672">+998 93 656 36 72</a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
