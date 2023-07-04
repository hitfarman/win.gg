import React from "react";
import SocialMediaLink from "./SocialMediaLink";
import { ISocialMediaLink } from "@/interfaces/navigation";
import SvgFacebookIcon from "@/components/SvgFacebookIcon";
import SvgInstagramIcon from "@/components/SvgInstagramIcon";
import SvgRssIcon from "@/components/SvgRssIcon";
import SvgTiktokIcon from "@/components/SvgTiktokIcon";
import SvgTwitterIcon from "@/components/SvgTwitterIcon";
import SvgYoutubeIcon from "@/components/SvgYoutubeIcon";

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

const NavSocialLinks = () => {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
      {socialMediaLinks.map((link) => (
        <SocialMediaLink key={link.href} {...link} />
      ))}
    </div>
  );
};

export default NavSocialLinks;
