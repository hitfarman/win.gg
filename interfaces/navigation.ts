type NavItemVariant = "link" | "button";
export interface INavItem {
  title: string;
  href: string;
  variant?: NavItemVariant;
}

export interface ISocialMediaLink {
  href: string;
  icon: JSX.Element;
}

export interface IBreadcrumb {
  text: string;
  url: string;
}

export interface ISubNavItem {
  label: string;
  category: string;
}
