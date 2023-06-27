import { ISocialMediaLink } from "@/interfaces/navigation";
import Link from "next/link";
import React, { FC } from "react";

const SocialMediaLink: FC<ISocialMediaLink> = ({ href, icon }) => {
  return (
    <Link href={href} target="_blank" className="svg-icon-button">
      {icon}
    </Link>
  );
};

export default SocialMediaLink;
