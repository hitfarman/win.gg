import Link from "next/link";
import Image from "next/image";
import winLogo from "@/assets/img/win-gg-white.png";
import React from "react";
import { INavItem } from "@/interfaces/navigation";
import NavSocialLinks from "@/components/NavSocialLinks";
import { frontendOrigin } from "@/constants/general";

const footerNavItems: INavItem[] = [
  { title: "About", href: `${frontendOrigin}/about-us/` },
  { title: "Contact", href: `${frontendOrigin}/contact/` },
  { title: "Privacy", href: `${frontendOrigin}/privacy-policy/` },
  { title: "Terms", href: `${frontendOrigin}/terms-of-service/` },
  { title: "Sitemap", href: `${frontendOrigin}/sitemap/` }
];

const Footer = () => {
  return (
    <footer className="full-bleed-black bg-black py-5 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between border-b-2 border-b-white">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <div className="relative mb-5">
            <Image className="block h-14 w-auto" src={winLogo} alt="win.gg" />
          </div>
        </Link>
        <h3 className="mb-5 font-header text-2xl font-semibold">
          WIN.gg is a proud part of Final Boss Entertainment.
        </h3>
      </div>
      <div className="flex flex-wrap justify-between">
        <nav className="mb-3 flex items-center gap-5">
          {footerNavItems.map((navItem) => (
            <Link
              key={`${navItem.href}-footer-nav`}
              href={navItem.href}
              className="text-sm font-semibold transition-colors hover:text-win-primary"
            >
              {navItem.title}
            </Link>
          ))}
        </nav>
        <NavSocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
