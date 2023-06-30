import { getFeaturedPostBySlug, getPaginatedPosts } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideos from "@/components/FeaturedVideos";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import PostList from "@/components/PostList";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IFeaturedPost, IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";

import { GetStaticProps, NextPage } from "next";
import React from "react";

type Props = {
  featuredPosts: IFeaturedPost[];
  homeDescription: string;
  homeTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  paginatedPosts: IPaginatedPostsResponse | null;
};

const Home: NextPage<Props> = ({
  featuredPosts,
  homeDescription,
  featuredVideos,
  homeTags,
  featuredReviews,
  paginatedPosts
}) => {
  return (
    <>
      <FeaturedPosts featuredPosts={featuredPosts} />
      <FeaturedVideos featuredVideos={featuredVideos.slice(0, 3)} />
      <div className="flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex-1">
          <PostList paginatedPosts={paginatedPosts} />
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={homeTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos.slice(3)} />
        </div>
      </div>
      {JSON.stringify(homeDescription, null, 2)}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
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
      first: POSTS_PER_PAGE,
      after: null,
      before: null,
      last: null
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
