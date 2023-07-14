import { getAllOptions } from "@/axios/options";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo, IPaginatedVideosResponse } from "@/interfaces/videos";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";
import { getPaginatedVideos } from "@/apollo/videos";
import { DEFAULT_REVALIDATION_TIME, POSTS_PER_PAGE } from "@/constants/posts";
import { IVideosPageProps } from "@/interfaces/pageProps";
import VideosPage from "@/components/VideosPage";

const Videos: NextPage<IVideosPageProps> = (props) => {
  return <VideosPage {...props} />;
};

export default Videos;

export const getStaticProps: GetStaticProps = async () => {
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
      offset: 0,
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
