import { IFeaturedTag } from "@/interfaces/tags";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  tags: IFeaturedTag[];
  isReviewPage?: boolean;
};

const FeaturedTags: FC<Props> = ({ tags, isReviewPage }) => {
  return (
    <div>
      <h3 className="border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        Tags
      </h3>
      <div className="flex flex-wrap gap-3 py-10">
        {tags.map((tag) => (
          <Link
            key={tag.term_id}
            href={`/${tag.slug}`}
            className={
              isReviewPage ? "win-tag-button-yellow" : "win-tag-button"
            }
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTags;
