import { INavItem } from "@/interfaces/navigation";
import React, { useState } from "react";
import winLogo from "@/assets/img/win-gg-white.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NavItem from "./NavItem";
import Sidebar from "./Sidebar";

const navItems: INavItem[] = [
  { title: "CSGO", href: "/csgo" },
  { title: "DOTA 2", href: "/dota" },
  { title: "LOL", href: "/league-of-legends" },
  { title: "VALORANT", href: "/valorant" },
  { title: "POKÉMON", href: "/pokemon" },
  { title: "GTA", href: "/gta" },
  { title: "TWITCH", href: "/twitch" },
  { title: "REVIEWS", href: "/reviews", variant: "button" }
];

const Header = () => {
  const { pathname } = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-black">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="relative">
            <Image className="block h-8 w-auto" src={winLogo} alt="win.gg" />
          </div>

          {/* Navigation */}
          <nav className="hidden h-full flex-1 items-center justify-center gap-4 md:flex ">
            {navItems.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                isSelected={pathname === item.href}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />
            <Bars3Icon
              onClick={() => setIsSidebarOpen(true)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
        </div>
      </header>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        navItems={navItems}
      />
    </>
  );
};

export default Header;
