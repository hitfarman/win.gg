import { getPaginatedVideos } from "@/apollo/videos";
import { getAllOptions } from "@/axios/options";
import VideosPage from "@/components/VideosPage";
import { DEFAULT_REVALIDATION_TIME, POSTS_PER_PAGE } from "@/constants/posts";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IVideosPageProps } from "@/interfaces/pageProps";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo, IPaginatedVideosResponse } from "@/interfaces/videos";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
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

const PaginatedVideosPage: NextPage<IVideosPageProps> = (props) => {
  return <VideosPage {...props} />;
};

export default PaginatedVideosPage;

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

export const getStaticProps: GetStaticProps<IVideosPageProps> = async ({
  params
}: GetStaticPropsContext) => {
  const { pageNumber } = params as { pageNumber: string };

  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let featuredTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let paginatedVideos: IPaginatedVideosResponse | null = null;

  try {
    options = await getAllOptions();
  } catch (e) {
    console.log("Fetching options failed in getStaticProps, with cause:", e);
  }

  if (options) {
    featuredReviews = extractFeaturedReviews(options);
    featuredVideos = extractFeaturedVideos(options);
    featuredTags = extractFeaturedTags(options["default-tags"]);
  }

  try {
    paginatedVideos = await getPaginatedVideos({
      offset: calculatePaginationOffset(Number(pageNumber)),
      size: POSTS_PER_PAGE
    });
  } catch (e) {
    console.log("Fetching paginated videos failed with cause:", e);
  }

  return {
    props: {
      featuredVideos,
      featuredReviews,
      featuredTags,
      paginatedVideos
    },
    revalidate: DEFAULT_REVALIDATION_TIME
  };
};
