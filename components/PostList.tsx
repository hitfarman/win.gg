import { IPaginatedPostsResponse } from "@/interfaces/posts";
import React, { FC } from "react";
import PostCard from "./PostCard";

type Props = {
  paginatedPosts: IPaginatedPostsResponse | null;
};

const PostList: FC<Props> = ({ paginatedPosts }) => {
  return (
    <div>
      {paginatedPosts?.posts.edges.map((post) => (
        <PostCard key={post.node.id} post={post.node} />
      ))}
    </div>
  );
};

export default PostList;
