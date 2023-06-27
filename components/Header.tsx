import { INavItem } from "@/interfaces/navigation";
import React from "react";
import { Disclosure } from "@headlessui/react";
import winLogo from "@/assets/img/win-gg-white.png";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BellIcon,
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import NavItem from "./NavItem";

const navItems: INavItem[] = [
  { title: "CSGO", href: "/csgo" },
  { title: "DOTA 2", href: "/dota" },
  { title: "LOL", href: "/league-of-legends" },
  { title: "VALORANT", href: "/valorant" },
  { title: "POKÉMON", href: "/pokemon" },
  { title: "GTA", href: "/gta" },
  { title: "TWITCH", href: "/twitch" },
  { title: "REVIEWS", href: "/reviews" }
];

const Header = () => {
  const { pathname } = useRouter();
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 py-7 sm:px-6 lg:px-8">
        <div className="relative">
          <Image className="block h-8 w-auto" src={winLogo} alt="win.gg" />
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-4 md:flex ">
          {navItems.map((item) => (
            <NavItem
              key={item.title}
              item={item}
              isSelected={pathname === item.href}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MagnifyingGlassIcon className="h-4 w-4 cursor-pointer" />
          <Bars3Icon className="h-4 w-4 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
