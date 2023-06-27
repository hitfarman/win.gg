import { INavItem } from "@/interfaces/navigation";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  item: INavItem;
  isSelected: boolean;
};

const NavItem: FC<Props> = ({ item, isSelected }) => {
  return (
    <Link
      href={item.href}
      className={`${
        isSelected ? "border-b-win-primary" : ""
      } border-b border-black pb-1 font-header text-sm transition-colors hover:border-b-2 hover:border-b-win-primary`}
    >
      {item.title}
    </Link>
  );
};

export default NavItem;
