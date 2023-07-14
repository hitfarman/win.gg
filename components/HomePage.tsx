import { IHomePageProps } from "@/interfaces/pageProps";
import React, { FC, useEffect, useState } from "react";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedVideos from "@/components/FeaturedVideos";
import PostList from "@/components/PostList";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import parse from "html-react-parser";
import { replaceImage } from "@/utils/replaceImage";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { useQuery } from "@apollo/client";
import {
  IPaginatedPostsResponse,
  IPostQueryVariables
} from "@/interfaces/posts";
import { GET_PAGINATED_POSTS } from "@/apollo/posts";
import { useRouter } from "next/router";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
import Head from "next/head";

const HomePage: FC<IHomePageProps> = ({
  featuredPosts,
  featuredReviews,
  featuredVideos,
  homeDescription,
  homeTags,
  paginatedPosts,
  pageSeo
}) => {
  // State
  const router = useRouter();
  const [postResponseToShow, setPostsResponseToShow] =
    useState<IPaginatedPostsResponse | null>(paginatedPosts);
  const [skipUseQuery, setSkipUseQuery] = useState<boolean>(true);
  const [queryVars, setQueryVars] = useState<IPostQueryVariables | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { loading, data: posts } = useQuery<IPaginatedPostsResponse>(
    GET_PAGINATED_POSTS,
    {
      variables: queryVars || {},
      ssr: false,
      skip: skipUseQuery
    }
  );

  useEffect(() => {
    const filterParam = router.query.filter;
    if (filterParam) {
      setSkipUseQuery(false);
      setQueryVars({
        categoryName: String(filterParam),
        offset: 0,
        size: POSTS_PER_PAGE
      });
    } else {
      setSkipUseQuery(true);
      setCurrentPage(1);
      setPostsResponseToShow(paginatedPosts);
    }
  }, [router.query, paginatedPosts]);

  useEffect(() => {
    if (posts && !skipUseQuery) {
      setPostsResponseToShow(posts);
    }
  }, [posts, skipUseQuery]);

  const changePage = (type: "next" | "prev" | "direct", to?: number) => {
    let updatedNumber = 0;
    if (type === "next") {
      setCurrentPage((prev) => {
        updatedNumber = prev + 1;
        return updatedNumber;
      });
    }
    if (type === "prev") {
      setCurrentPage((prev) => {
        updatedNumber = prev - 1;
        return updatedNumber;
      });
    }
    if (type === "direct" && to) {
      setCurrentPage(() => {
        updatedNumber = to;
        return updatedNumber;
      });
    }

    setQueryVars((prev) => ({
      ...prev,
      offset: calculatePaginationOffset(updatedNumber)
    }));
  };

  return (
    <>
      <Head>{parse(pageSeo)}</Head>
      <FeaturedPosts featuredPosts={featuredPosts} />
      <FeaturedVideos featuredVideos={featuredVideos.slice(0, 3)} />
      <div className="flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex-1">
          <PostList
            subNavigationProps={{
              loading,
              hasSubNavigation: true,
              isActive: !!router.query.filter,
              changePage,
              currentPage
            }}
            paginatedPosts={postResponseToShow}
            title="Latest news"
          />
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={homeTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos.slice(3)} />
        </div>
      </div>
      <div className="parsed-wp-content my-5">
        {parse(homeDescription, { replace: replaceImage })}
      </div>
    </>
  );
};

export default HomePage;
