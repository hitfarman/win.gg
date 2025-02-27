import { INavItem } from "@/interfaces/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC, Fragment } from "react";
import winLogo from "@/assets/img/win-gg-white.png";
import Image from "next/image";
import NavSocialLinks from "./NavSocialLinks";
import { frontendOrigin } from "@/constants/general";

type Props = {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  navItems: INavItem[];
};

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
                  className="rounded-full p-1 transition-colors hover:bg-win-primary"
                  onClick={closeSidebar}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="size-5 text-win-primary hover:text-win-black"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <nav className="mt-10 flex flex-1 flex-col gap-2 font-header text-win-primary">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={`${frontendOrigin}/${item.href}/`}
                    className="border border-transparent px-2 py-1 font-semibold transition-colors hover:border-win-primary"
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
                    href={`${frontendOrigin}/about-us/`}
                    className="win-secondary-button"
                  >
                    About
                  </Link>
                  <Link
                    onClick={closeSidebar}
                    href={`${frontendOrigin}/contact/`}
                    className="win-secondary-button"
                  >
                    Contact
                  </Link>
                </div>
                <NavSocialLinks />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
