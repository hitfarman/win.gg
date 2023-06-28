import { IFeaturedPost } from "@/interfaces/posts";
import React, { FC } from "react";
import FeaturedPostItem from "./FeaturedPostItem";

type Props = { featuredPosts: IFeaturedPost[] };

const FeaturedPosts: FC<Props> = ({ featuredPosts }) => {
  return (
    <div className="grid h-[500px] grid-cols-12 gap-5">
      <FeaturedPostItem
        featuredPost={featuredPosts[0]}
        className="col-span-7"
        variant="main"
      />
      <div className="col-span-5 grid grid-cols-1 gap-5">
        {featuredPosts.slice(1).map((post) => (
          <FeaturedPostItem
            key={post.slug}
            featuredPost={post}
            variant="secondary"
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
