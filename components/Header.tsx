import { INavItem } from "@/interfaces/navigation";
import React, { useEffect, useState } from "react";
import winLogo from "@/assets/img/win-gg-white.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NavItem from "./NavItem";
import Sidebar from "./Sidebar";
import Link from "next/link";
import LinearLoading from "./LinearLoading";

const navItems: INavItem[] = [
  { title: "CSGO", href: "/csgo" },
  { title: "DOTA 2", href: "/dota2" },
  { title: "LOL", href: "/lol" },
  { title: "VALORANT", href: "/valorant" },
  { title: "POKÉMON", href: "/pokemon" },
  { title: "GTA", href: "/gta" },
  { title: "TWITCH", href: "/twitch" },
  { title: "REVIEWS", href: "/reviews", variant: "button" }
];

const Header = () => {
  const { pathname } = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", () => handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-black">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <div className="relative">
              <Image className="block h-8 w-auto" src={winLogo} alt="win.gg" />
            </div>
          </Link>

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
        {isLoading && <LinearLoading />}
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
