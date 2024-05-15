import { frontendOrigin } from "@/constants/general";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  index: number;
  name: string;
  slug: string;
};

const FeaturedReviewItem: FC<Props> = ({ index, name, slug }) => {
  return (
    <Link
      href={`${frontendOrigin}/news/${slug}/`}
      className="flex items-center gap-5"
    >
      <p className="flex h-10 min-h-[40px] w-10 min-w-[40px] items-center justify-center rounded-full bg-transparent p-2 font-header text-lg font-bold text-win-primary ring-1 ring-win-primary ">
        {index}
      </p>
      <p className="font-header text-lg font-bold">{name}</p>
    </Link>
  );
};

export default FeaturedReviewItem;
