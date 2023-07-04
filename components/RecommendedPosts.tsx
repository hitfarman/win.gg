import { IFeaturedPost } from "@/interfaces/posts";
import React, { FC } from "react";

type Props = {
  posts: IFeaturedPost[];
};

const RecommendedPosts: FC<Props> = ({ posts }) => {
  return (
    <div className="full-bleed-gray bg-win-gray py-10">
      <h3 className="mb-10 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        Recommended
      </h3>
      <div>{posts.map((post) => post.title)}</div>
    </div>
  );
};

export default RecommendedPosts;
