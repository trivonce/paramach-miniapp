import { HomeIcon, ShoppingBasketIcon, TableOfContentsIcon, UserIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useCartStore } from "@/lib/store/cart";
import { useTranslation } from 'react-i18next';

const menu = [
  {
    id: "home",
    to: "/",
    name: "menu_home",
    icon: HomeIcon,
  },
  {
    id: "cart",
    to: "/cart",
    name: "menu_cart",
    icon: ShoppingBasketIcon,
  },
  {
    id: "orders",
    to: "/orders",
    name: "menu_orders",
    icon: TableOfContentsIcon,
  },
  {
    id: "profile",
    to: "/profile",
    name: "menu_profile",
    icon: UserIcon,
  },
];

const MenuBar = () => {
  const { pathname } = useLocation();
  const items = useCartStore((state: { items: any[] }) => state.items);
  const { t } = useTranslation();

  if ((pathname === "/cart" && items.length !== 0) || pathname === "/checkout") return null;

  return (
    <div className="fixed bottom-0 left-0 px-2 pb-2 w-full bg-transparent z-40 ">
      <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex justify-evenly items-center text-center rounded-3xl py-2 dark:bg-gray-900/[0.8] bg-white/[0.6] backdrop-blur-md">
        {menu.map(({ id, name, icon: Icon, to }, index) => (
          <span key={id} className="flex justify-center">
            <NavLink
              key={index}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center rounded-full cursor-pointer gap-0.5 duration-200 font-semibold relative ${
                  isActive ? "text-brand font-semibold" : "dark:text-gray-100 text-gray-500"
                } `
              }
              to={to}
            >
              {id === 'cart' && items.length > 0 && (
                <span className="bg-yellow-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 right-0">
                  {items.length}
                </span>
              )}
              <Icon className="shrink-0" size={30} />
              <span className="text-xs">{t(name)}</span>
            </NavLink>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
