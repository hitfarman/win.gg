import { getFeaturedPostBySlug, getPaginatedPosts } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import HomePage from "@/components/HomePage";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IHomePageProps } from "@/interfaces/pageProps";
import { IFeaturedPost, IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
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

  try {
    options = await getAllOptions();
  } catch (e) {
    console.log("Fetching options failed in getStaticProps, with cause:", e);
  }

  if (options) {
    homeDescription = options["homepage-description"];
    homeTags = options["default-tags"].map((optionTag) => ({
      name: optionTag.name,
      slug: optionTag.slug,
      term_id: optionTag.term_id
    }));
    featuredReviews = [
      options["featured_review_1"],
      options["featured_review_2"],
      options["featured_review_3"]
    ].map((review) => ({
      id: review.ID,
      name: review.post_title,
      slug: review.post_name
    }));

    featuredVideos = Object.keys(options)
      .filter((key) => key.includes("featured_video_"))
      .map((key) => ({
        url: (options![key as keyof IAllOptionsResponse] || "") as string
      }));

    const featuredPostSlugs = options["homepage-featured-articles"].map(
      (post) => post.post_name
    );
    // TODO err handling
    featuredPosts = await Promise.all(
      featuredPostSlugs.map((slug) => getFeaturedPostBySlug(slug))
    );
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
      paginatedPosts
    },
    revalidate: 60 * 5
  };
};
