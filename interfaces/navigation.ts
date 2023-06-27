type NavItemVariant = "link" | "button";
export interface INavItem {
  title: string;
  href: string;
  variant?: NavItemVariant;
}
