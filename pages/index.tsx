import { getPaginatedPosts } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import HomePage from "@/components/HomePage";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IHomePageProps } from "@/interfaces/pageProps";
import { IFeaturedPost, IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { extractFeaturedPosts } from "@/utils/extractFeaturedPosts";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";
import { GetStaticProps, NextPage } from "next";
import React from "react";

const Home: NextPage<IHomePageProps> = (props) => {
  return <HomePage {...props} />;
};

export default Home;

export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  let featuredPosts: IFeaturedPost[] = [];
  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let homeTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let homeDescription = "";
  let paginatedPosts: IPaginatedPostsResponse | null = null;

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
    paginatedPosts = await getPaginatedPosts({
      offset: 0,
      size: POSTS_PER_PAGE
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
      paginatedPosts
    },
    revalidate: 60 * 5
  };
};
