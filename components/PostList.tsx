import { IPaginatedPostsResponse } from "@/interfaces/posts";
import React, { FC } from "react";
import PostCard from "./PostCard";
import { generatePageNumbers } from "@/utils/generatePageNumbers";
import { useRouter } from "next/router";

type Props = {
  paginatedPosts: IPaginatedPostsResponse | null;
  title?: string;
};

const PostList: FC<Props> = ({ paginatedPosts, title }) => {
  const { asPath, push } = useRouter();
  const pageParamIsInUrl = /\/page\/\d+/.test(asPath);
  const pageNumber = pageParamIsInUrl ? parseInt(asPath.split("/page/")[1]) : 1;

  // Methods
  const changePage = (type: "next" | "prev" | "direct", to?: number) => {
    if (type === "next") {
      if (!pageParamIsInUrl) {
        return push(`${asPath}/page/2`);
      }

      return push(
        asPath.replace(`/page/${pageNumber}`, `/page/${pageNumber + 1}`)
      );
    }

    if (type === "prev") {
      if (pageNumber === 2) {
        return push(asPath.replace(`/page/${pageNumber}`, "/"));
      }

      return push(
        asPath.replace(`/page/${pageNumber}`, `/page/${pageNumber - 1}`)
      );
    }
    if (type === "direct") {
      if (to === 1) {
        return push(asPath.replace(`/page/${pageNumber}`, "/"));
      }

      if (!pageParamIsInUrl) {
        return push(`${asPath}/page/${to}`);
      }

      return push(asPath.replace(`/page/${pageNumber}`, `/page/${to}`));
    }
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
            Previous
          </button>
        )}
        <div className="flex gap-2">
          {generatePageNumbers({
            siblingCount: 1,
            currentPage: pageNumber,
            totalCount:
              paginatedPosts?.posts.pageInfo.offsetPagination.total ||
              pageNumber
          }).map((page, i) => (
            <button
              key={`${page}-pagination-button-${
                typeof page === "string" ? i : ""
              }`}
              className={`win-secondary-button ${
                page === pageNumber ? "bg-win-primary-hover" : ""
              }`}
              onClick={() => {
                if (typeof page === "number") changePage("direct", page);
              }}
            >
              {page}
            </button>
          ))}
        </div>
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasMore && (
          <button
            className="win-secondary-button"
            onClick={() => changePage("next")}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default PostList;
