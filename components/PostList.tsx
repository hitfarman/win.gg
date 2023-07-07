import { IPaginatedPostsResponse } from "@/interfaces/posts";
import React, { FC } from "react";
import PostCard from "./PostCard";
import { useRouter } from "next/router";
import PaginationNumbers from "./PaginationNumbers";

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
        return push(
          `${asPath}${asPath[asPath.length - 1] === "/" ? "" : "/"}page/2`
        );
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
        return push(
          `${asPath}${asPath[asPath.length - 1] === "/" ? "" : "/"}page/${to}`
        );
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

      <PaginationNumbers
        className="mt-5 flex flex-wrap justify-center gap-2 text-xs sm:hidden"
        changePage={changePage}
        pageNumber={pageNumber}
        siblingCount={1}
        total={
          paginatedPosts?.posts.pageInfo.offsetPagination.total || pageNumber
        }
      />
      <div className="mt-5 flex justify-center gap-5">
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasPrevious && (
          <button
            className="win-secondary-button"
            onClick={() => changePage("prev")}
          >
            Previous
          </button>
        )}
        <PaginationNumbers
          className="hidden gap-2 sm:flex"
          changePage={changePage}
          pageNumber={pageNumber}
          siblingCount={1}
          total={
            paginatedPosts?.posts.pageInfo.offsetPagination.total || pageNumber
          }
        />
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
