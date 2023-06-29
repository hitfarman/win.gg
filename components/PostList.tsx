import {
  IPaginatedPostsResponse,
  IPostQueryVariables
} from "@/interfaces/posts";
import React, { FC, useEffect, useMemo, useState } from "react";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";
import { useQuery } from "@apollo/client";
import { GET_PAGINATED_POSTS } from "@/apollo/posts";
import { POSTS_PER_PAGE } from "@/constants/posts";

type Props = {
  paginatedPosts: IPaginatedPostsResponse | null;
};

const PostList: FC<Props> = ({ paginatedPosts }) => {
  // Constant
  const postSkeletons = new Array(POSTS_PER_PAGE).fill(0);
  // State
  const [skipUseQuery, setSkipUseQuery] = useState<boolean>(true);
  const [queryVars, setQueryVars] = useState<IPostQueryVariables | null>(null);

  const {
    loading,
    data: posts,
    refetch: refetchPosts,
    updateQuery: updatePosts
  } = useQuery<IPaginatedPostsResponse>(GET_PAGINATED_POSTS, {
    variables: queryVars || {},
    ssr: false,
    skip: skipUseQuery
  });

  // Methods
  const changePage = (type: "next" | "prev") => {
    if (type === "next") {
      setQueryVars({
        first: POSTS_PER_PAGE,
        after:
          skipUseQuery && paginatedPosts
            ? paginatedPosts.posts.pageInfo.endCursor
            : posts
            ? posts.posts.pageInfo.endCursor
            : null,
        before: null,
        last: null
      });
    } else {
      setQueryVars({
        first: null,
        after: null,
        before:
          skipUseQuery && paginatedPosts
            ? paginatedPosts.posts.pageInfo.startCursor
            : posts
            ? posts.posts.pageInfo.startCursor
            : null,
        last: POSTS_PER_PAGE
      });
    }
    setSkipUseQuery(false);
  };
  // Effects
  useEffect(() => {
    if (queryVars) {
      refetchPosts();
    }
  }, [queryVars, refetchPosts]);

  // Memo
  const hasPrevious = useMemo<boolean | undefined>(() => {
    return skipUseQuery
      ? paginatedPosts?.posts.pageInfo.hasPreviousPage
      : posts?.posts.pageInfo.hasPreviousPage;
  }, [skipUseQuery, posts, paginatedPosts?.posts.pageInfo.hasPreviousPage]);
  const hasNext = useMemo<boolean | undefined>(() => {
    return skipUseQuery
      ? paginatedPosts?.posts.pageInfo.hasNextPage
      : posts?.posts.pageInfo.hasNextPage;
  }, [skipUseQuery, posts, paginatedPosts?.posts.pageInfo.hasNextPage]);

  return (
    <>
      <div>
        {loading}
        {loading &&
          postSkeletons.map((_skeleton, i) => <PostSkeleton key={i} />)}
        {!loading &&
          (!posts
            ? paginatedPosts?.posts.edges.map((post) => (
                <PostCard key={post.node.id} post={post.node} />
              ))
            : posts.posts.edges.map((post) => (
                <PostCard key={post.node.id} post={post.node} />
              )))}
      </div>
      <div className="flex gap-5">
        {hasPrevious && (
          <button
            className="win-secondary-button"
            onClick={() => changePage("prev")}
          >
            Previous page
          </button>
        )}
        {hasNext && (
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
