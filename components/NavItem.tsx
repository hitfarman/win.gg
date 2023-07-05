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
      href={`${item.href}`}
      className={`border-b border-transparent pb-1 font-header text-sm font-semibold transition-colors hover:border-b-win-primary ${
        item.variant === "button" ? "win-nav-button" : ""
      } ${isSelected ? "border-b-win-primary" : ""}`}
    >
      {item.title}
    </Link>
  );
};

export default NavItem;
