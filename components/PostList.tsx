import { IPaginatedPostsResponse } from "@/interfaces/posts";
import React, { FC, useMemo } from "react";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/router";
import PaginationNumbers from "@/components/PaginationNumbers";
import Link from "next/link";
import Head from "next/head";
import { frontendOrigin } from "@/constants/general";

type Props = {
  paginatedPosts: IPaginatedPostsResponse | null;
  title?: string;
  isReviewPage?: boolean;
};

const PostList: FC<Props> = ({ paginatedPosts, title, isReviewPage }) => {
  // Constant
  const { asPath } = useRouter();
  const pageParamIsInUrl = /\/page\/\d+/.test(asPath);
  const pageNumber = pageParamIsInUrl ? parseInt(asPath.split("/page/")[1]) : 1;

  const nextLink = useMemo<string>(() => {
    if (!pageParamIsInUrl) {
      return `${frontendOrigin}${asPath}${
        asPath[asPath.length - 1] === "/" ? "" : "/"
      }page/2`;
    }
    return `${frontendOrigin}${asPath.replace(
      `/page/${pageNumber}`,
      `/page/${pageNumber + 1}`
    )}`;
  }, [asPath, pageParamIsInUrl, pageNumber]);
  const prevLink = useMemo<string>(() => {
    if (pageNumber === 2) {
      return `${frontendOrigin}${asPath.replace(`/page/${pageNumber}`, "/")}`;
    }

    return `${frontendOrigin}${asPath.replace(
      `/page/${pageNumber}`,
      `/page/${pageNumber - 1}`
    )}`;
  }, [asPath, pageNumber]);

  return (
    <>
      <Head>
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasMore && (
          <link rel="next" href={nextLink} />
        )}
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasPrevious && (
          <link rel="prev" href={prevLink} />
        )}
      </Head>
      {title && (
        <h3 className="mb-10 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
          {title}
        </h3>
      )}

      <div>
        {paginatedPosts ? (
          paginatedPosts?.posts.edges.map((post) => (
            <PostCard
              key={post.node.id}
              post={post.node}
              isReviewPage={isReviewPage}
            />
          ))
        ) : (
          <p>Sorry, there are currently no posts available!</p>
        )}
      </div>

      <PaginationNumbers
        className="mt-5 flex flex-wrap justify-center gap-2 text-xs sm:hidden"
        pageNumber={pageNumber}
        siblingCount={1}
        total={
          paginatedPosts?.posts.pageInfo.offsetPagination.total || pageNumber
        }
        isReviewPage={isReviewPage}
        pageParamIsInUrl={pageParamIsInUrl}
      />
      <div className="mt-5 flex justify-center gap-5">
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasPrevious && (
          <Link
            className={
              isReviewPage
                ? "win-secondary-button-yellow"
                : "win-secondary-button"
            }
            href={prevLink}
          >
            Previous
          </Link>
        )}
        <PaginationNumbers
          className="hidden gap-2 sm:flex"
          pageNumber={pageNumber}
          siblingCount={1}
          total={
            paginatedPosts?.posts.pageInfo.offsetPagination.total || pageNumber
          }
          isReviewPage={isReviewPage}
          pageParamIsInUrl={pageParamIsInUrl}
        />
        {paginatedPosts?.posts.pageInfo.offsetPagination.hasMore && (
          <Link
            className={
              isReviewPage
                ? "win-secondary-button-yellow"
                : "win-secondary-button"
            }
            href={nextLink}
          >
            Next
          </Link>
        )}
      </div>
    </>
  );
};

export default PostList;
