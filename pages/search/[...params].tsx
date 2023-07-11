import { getPaginatedPosts } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import PostList from "@/components/PostList";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag, ITagSlug } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import parse from "html-react-parser";
import { replaceImage } from "@/utils/replaceImage";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";
import { useRouter } from "next/router";
import { searchByQuery } from "@/apollo/search";
import Head from "next/head";

type Props = {
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  featuredTags: IFeaturedTag[];
  paginatedPosts: IPaginatedPostsResponse | null;
  searchQuery: string;
};

const SearchPage: NextPage<Props> = ({
  featuredReviews,
  featuredTags,
  featuredVideos,
  paginatedPosts,
  searchQuery
}) => {
  const router = useRouter();

  return (
    <>
      {/* SEO */}
      <Head>
        <title>{`You searched for ${searchQuery} - WIN.gg`}</title>
      </Head>

      <div className="mt-10">
        <Breadcrumbs
          crumbs={[
            {
              text: `Search for "${searchQuery}"` || "search",
              url: router.asPath
            }
          ]}
        />
      </div>
      <div className="flex flex-col gap-10 py-5 md:flex-row">
        <div className="flex-1">
          <PostList
            paginatedPosts={paginatedPosts}
            title={`Results for "${searchQuery}"`}
          />
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={featuredTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  context.res.setHeader(
    "Cache-control",
    "public, s-maxage=300, stale-while-revalidate=30"
  );
  const { params } = context.params as { params: string[] };
  const searchQuery = params[0];
  const pageNumber = params[2];

  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let featuredTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let paginatedPosts: IPaginatedPostsResponse | null = null;

  try {
    options = await getAllOptions();
  } catch (e) {
    console.log(
      "Fetching options failed in getServerSideProps, with cause:",
      e
    );
  }

  if (options) {
    featuredTags = extractFeaturedTags(options["default-tags"]);
    featuredReviews = extractFeaturedReviews(options);
    featuredVideos = extractFeaturedVideos(options);
  }

  try {
    paginatedPosts = await searchByQuery({
      size: POSTS_PER_PAGE,
      offset: pageNumber ? calculatePaginationOffset(Number(pageNumber)) : 0,
      search: searchQuery
    });
  } catch (e) {
    console.log(
      "Fetching paginated posts for search query failed with cause:",
      e
    );
  }

  return {
    props: {
      featuredVideos,
      featuredReviews,
      featuredTags,
      paginatedPosts,
      searchQuery
    }
  };
};
