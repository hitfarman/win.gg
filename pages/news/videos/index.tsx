import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";

type Props = {
  featuredTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  paginatedPosts: IPaginatedPostsResponse | null;
  seoInfo: null;
};

const VideosPage: NextPage<Props> = ({
  featuredVideos,
  featuredTags,
  featuredReviews,
  paginatedPosts,
  seoInfo
}) => {
  return (
    <>
      {/* SEO */}
      <div className="mt-10">
        <Breadcrumbs crumbs={[{ text: "Videos", url: "/news/videos" }]} />
      </div>
      <div className="flex flex-col gap-10 py-5 md:flex-row">
        <div className="flex-1">Work in progress, please come back later.</div>
        <div className="md:w-4/12">
          <FeaturedTags tags={featuredTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos} />
        </div>
      </div>
    </>
  );
};

export default VideosPage;

export const getStaticProps: GetStaticProps = async () => {
  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let featuredTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;

  let paginatedPosts: IPaginatedPostsResponse | null = null;
  let seoInfo = null;

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
    paginatedPosts = null;
  } catch (e) {
    console.log("Fetching paginated posts failed with cause:", e);
  }

  return {
    props: {
      featuredVideos,
      featuredReviews,
      featuredTags,
      paginatedPosts,
      seoInfo
    },
    revalidate: 60 * 5
  };
};
