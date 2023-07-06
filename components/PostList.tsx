import { IPaginatedPostsResponse } from "@/interfaces/posts";
import React, { FC } from "react";
import PostCard from "./PostCard";

type Props = {
  paginatedPosts: IPaginatedPostsResponse | null;
  title?: string;
};

const PostList: FC<Props> = ({ paginatedPosts, title }) => {
  // Methods
  const changePage = (type: "next" | "prev") => {
    console.log("GET", type, "PAGE");
  };

  return (
    <>
      {title && (
        <h3 className="mb-10 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
          {title}
        </h3>
      )}
      <div>
        {paginatedPosts ? (
          paginatedPosts?.posts.edges.map((post) => (
            <PostCard key={post.node.id} post={post.node} />
          ))
        ) : (
          <p>Sorry, there are currently no posts available!</p>
        )}
      </div>
      <div className="flex gap-5">
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasPrevious && (
          <button
            className="win-secondary-button"
            onClick={() => changePage("prev")}
          >
            Previous page
          </button>
        )}
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasMore && (
          <button
            className="win-secondary-button"
            onClick={() => changePage("next")}
          >
            Next page
          </button>
        )}
      </div>
    </>
  );
};

export default PostList;
