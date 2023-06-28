import { getFeaturedPostBySlug } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideos from "@/components/FeaturedVideos";
import PostList from "@/components/PostList";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IFeaturedPost } from "@/interfaces/posts";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";

import { GetStaticProps, NextPage } from "next";
import React from "react";

type Props = {
  featuredPosts: IFeaturedPost[];
  homeDescription: string;
  homeTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
};

const Home: NextPage<Props> = ({
  featuredPosts,
  homeDescription,
  featuredVideos,
  homeTags
}) => {
  return (
    <>
      <FeaturedPosts featuredPosts={featuredPosts} />
      <FeaturedVideos featuredVideos={featuredVideos} />
      <div className="flex flex-col py-10 md:flex-row">
        <div className="flex-1">
          <PostList />
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={homeTags} />
          <FeaturedReviews />
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
  let homeTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse["options"] | null = null;
  let homeDescription = "";
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

    const featuredPostSlugs = options["homepage-featured-articles"].map(
      (post) => post.post_name
    );
    // TODO err handling
    featuredPosts = await Promise.all(
      featuredPostSlugs.map((slug) => getFeaturedPostBySlug(slug))
    );
  }

  return {
    props: { featuredPosts, homeDescription, homeTags, featuredVideos },
    revalidate: 60 * 5
  };
};
