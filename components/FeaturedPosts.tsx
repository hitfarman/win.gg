import { IFeaturedPost } from "@/interfaces/posts";
import React, { FC } from "react";
import FeaturedPostItem from "./FeaturedPostItem";

type Props = { featuredPosts: IFeaturedPost[] };

const FeaturedPosts: FC<Props> = ({ featuredPosts }) => {
  return (
    <div className="grid h-[1200px] grid-cols-12 gap-5 md:h-[500px]">
      <FeaturedPostItem
        featuredPost={featuredPosts[0]}
        className="col-span-12 md:col-span-7"
        variant="main"
      />
      <div className="col-span-12 grid grid-cols-1 gap-5 md:col-span-5">
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
