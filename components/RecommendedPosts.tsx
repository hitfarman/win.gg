import { IFeaturedPost } from "@/interfaces/posts";
import React, { FC } from "react";
import PostCard from "./PostCard";

type Props = {
  posts: IFeaturedPost[];
};

const RecommendedPosts: FC<Props> = ({ posts }) => {
  return (
    <div className="full-bleed-gray bg-win-gray py-10">
      <h3 className="mb-10 border-b-2 border-b-win-primary pb-5 font-header text-4xl font-semibold">
        Recommended
      </h3>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard
            post={post}
            variant="fixed-vertical"
            key={`${i}-recommended-post`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;
