import { getFeaturedPostBySlug } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedVideos from "@/components/FeaturedVideos";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IFeaturedPost } from "@/interfaces/posts";
import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import React from "react";

type Props = {
  featuredPosts: IFeaturedPost[];
  homeDescription: string;
};

const Home: NextPage<Props> = ({ featuredPosts, homeDescription }) => {
  return (
    <>
      <FeaturedPosts featuredPosts={featuredPosts} />
      <FeaturedVideos />
      {JSON.stringify(homeDescription, null, 2)}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  let featuredPosts: IFeaturedPost[] = [];
  let options: IAllOptionsResponse["options"] | null = null;
  let homeDescription = "";
  try {
    options = await getAllOptions();
  } catch (e) {
    console.log("Fetching options failed in getStaticProps, with cause:", e);
  }

  if (options) {
    homeDescription = options["homepage-description"];

    const featuredPostSlugs = options["homepage-featured-articles"].map(
      (post) => post.post_name
    );
    // TODO err handling
    featuredPosts = await Promise.all(
      featuredPostSlugs.map((slug) => getFeaturedPostBySlug(slug))
    );
  }

  return { props: { featuredPosts, homeDescription }, revalidate: 60 * 5 };
};
