import { getPaginatedPosts } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import { getPageSeoBySlug } from "@/axios/seo";
import HomePage from "@/components/HomePage";
import { DEFAULT_REVALIDATION_TIME, POSTS_PER_PAGE } from "@/constants/posts";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IHomePageProps } from "@/interfaces/pageProps";
import { IFeaturedPost, IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
import { extractFeaturedPosts } from "@/utils/extractFeaturedPosts";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage
} from "next";
import React from "react";

const PaginatedHomepage: NextPage<IHomePageProps> = (props) => {
  return <HomePage {...props} />;
};

export default PaginatedHomepage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { pageNumber: string } }[] = [
    2, 3, 4, 5, 6, 7, 8, 9, 10
  ].map((pageNumber) => ({
    params: { pageNumber: `${pageNumber}` }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async ({
  params
}: GetStaticPropsContext) => {
  const { pageNumber } = params as { pageNumber: string };

  let featuredPosts: IFeaturedPost[] = [];
  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let homeTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let homeDescription = "";
  let paginatedPosts: IPaginatedPostsResponse | null = null;
  let pageSeo = "";

  try {
    options = await getAllOptions();
  } catch (e) {
    console.log("Fetching options failed in getStaticProps, with cause:", e);
  }

  if (options) {
    homeDescription = options["homepage-description"];

    homeTags = extractFeaturedTags(options["default-tags"]);
    featuredReviews = extractFeaturedReviews(options);

    featuredVideos = extractFeaturedVideos(options);

    featuredPosts = await extractFeaturedPosts(
      options["homepage-featured-articles"]
    );
  }

  try {
    pageSeo = (await getPageSeoBySlug("home-page")).yoast_head;
  } catch (e) {
    console.log("Fetching page seo failed with cause:", e);
  }

  try {
    paginatedPosts = await getPaginatedPosts({
      size: POSTS_PER_PAGE,
      offset: calculatePaginationOffset(Number(pageNumber))
    });
  } catch (e) {
    console.log("Fetching paginated posts failed with cause:", e);
  }

  return {
    props: {
      featuredPosts,
      homeDescription,
      homeTags,
      featuredVideos,
      featuredReviews,
      paginatedPosts,
      pageSeo
    },
    revalidate: DEFAULT_REVALIDATION_TIME
  };
};
