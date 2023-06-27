import { INavItem, ISocialMediaLink } from "@/interfaces/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC, Fragment } from "react";
import winLogo from "@/assets/img/win-gg-white.png";
import Image from "next/image";
import SvgFacebookIcon from "./SvgFacebookIcon";
import SvgYoutubeIcon from "./SvgYoutubeIcon";
import SvgInstagramIcon from "./SvgInstagramIcon";
import SvgTwitterIcon from "./SvgTwitterIcon";
import SvgTiktokIcon from "./SvgTiktokIcon";
import SvgRssIcon from "./SvgRssIcon";
import SocialMediaLink from "./SocialMediaLink";

type Props = {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  navItems: INavItem[];
};

const socialMediaLinks: ISocialMediaLink[] = [
  { href: "https://www.youtube.com/c/wingg", icon: <SvgYoutubeIcon /> },
  {
    href: "https://www.instagram.com/officialwingg/",
    icon: <SvgInstagramIcon />
  },
  {
    href: "https://www.facebook.com/officialWINgg/",
    icon: <SvgFacebookIcon />
  },
  { href: "https://twitter.com/officialWINgg", icon: <SvgTwitterIcon /> },
  { href: "https://www.tiktok.com/@official_wingg", icon: <SvgTiktokIcon /> },
  // TODO RSS href missing on official page
  { href: "#", icon: <SvgRssIcon /> }
];

const Sidebar: FC<Props> = ({ isSidebarOpen, closeSidebar, navItems }) => {
  return (
    <Transition.Root show={isSidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeSidebar}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-y-0 right-0">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="flex h-full w-screen flex-col overflow-auto bg-win-gray px-4 py-8 sm:w-[280px]">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Image
                    className="block h-5 w-auto"
                    src={winLogo}
                    alt="win.gg"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-full p-1 transition-colors hover:bg-slate-200/30 "
                  onClick={closeSidebar}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <nav className="mt-10 flex flex-1 flex-col gap-5 font-header text-white">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`px-2 py-1 font-semibold transition-colors hover:bg-slate-200/30    ${
                      item.variant === "button" ? "hover:bg-win-primary/90" : ""
                    }`}
                    onClick={closeSidebar}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div>
                <div className="mb-8 flex justify-center gap-5">
                  <Link
                    onClick={closeSidebar}
                    href="/about"
                    className="win-secondary-button"
                  >
                    About
                  </Link>
                  <Link
                    onClick={closeSidebar}
                    href="/contact"
                    className="win-secondary-button"
                  >
                    Contact
                  </Link>
                </div>
                <div className="mb-3 flex justify-center gap-2">
                  {socialMediaLinks.map((link) => (
                    <SocialMediaLink key={link.href} {...link} />
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
