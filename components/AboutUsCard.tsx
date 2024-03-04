import { IAboutUsCardInfo } from "@/interfaces/pageInfo";
import React, { FC } from "react";
import Image from "next/image";

type Props = {
  info: IAboutUsCardInfo;
};

const AboutUsCard: FC<Props> = ({ info }) => {
  return (
    <div className="flex items-center gap-5">
      <Image
        src={info.image}
        alt={info.position}
        width={150}
        height={150}
        className="rounded-full"
      />
      <div className="parsed-wp-content">
        <h3>{info.name}</h3>
        <h4 className="text-win-primary">{info.position}</h4>
        <a href={`mailto:${info.email}`}>{info.email}</a>
      </div>
    </div>
  );
};

export default AboutUsCard;
