import { frontendOrigin } from "@/constants/general";
import { IFeaturedTag } from "@/interfaces/tags";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  tags: IFeaturedTag[];
};

const FeaturedTags: FC<Props> = ({ tags }) => {
  return (
    <div>
      <h3 className="border-b-2 border-b-win-primary pb-5 font-header text-4xl font-semibold">
        Tags
      </h3>
      <div className="flex flex-wrap gap-3 py-10">
        {tags.map((tag) => (
          <Link
            key={tag.term_id}
            href={`${frontendOrigin}/${tag.slug}`}
            className="win-tag-button"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTags;
