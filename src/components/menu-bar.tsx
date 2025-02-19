import { HomeIcon, ShoppingBasketIcon, TableOfContentsIcon, UserIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    id: "home",
    to: "/",
    name: "Asosiy",
    icon: HomeIcon,
  },
  {
    id: "cart",
    to: "/cart",
    name: "Savatcha",
    icon: ShoppingBasketIcon,
  },
  {
    id: "orders",
    to: "/orders",
    name: "Buyurtmalar",
    icon: TableOfContentsIcon,
  },
  {
    id: "profile",
    to: "/profile",
    name: "Profil",
    icon: UserIcon,
  },
];

const MenuBar = () => {
  return (
    <div className="fixed bottom-0 left-0 px-2 pb-2 w-full bg-transparent z-40">
      <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex justify-evenly items-center text-center rounded-3xl py-2">
        {menu.map(({ name, icon: Icon, to }, index) => (
          <span className="flex justify-center">
            <NavLink
              key={index}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center rounded-full cursor-pointer gap-0.5 duration-200 font-semibold ${
                  isActive ? "text-brand font-semibold" : "text-gray-500"
                } `
              }
              to={to}
            >
              <Icon className="shrink-0" size={30} />
              <span className="text-xs">{name}</span>
            </NavLink>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
