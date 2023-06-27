import { getFeaturedPostBySlug } from "@/apollo/posts";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedVideos from "@/components/FeaturedVideos";
import { IFeaturedPost } from "@/interfaces/posts";
import { GetStaticProps, NextPage } from "next";
import React from "react";

type Props = {
  featuredPosts: IFeaturedPost[];
};

const Home: NextPage<Props> = ({ featuredPosts }) => {
  return (
    <>
      {JSON.stringify(featuredPosts, null, 2)}
      <FeaturedPosts />
      <FeaturedVideos />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  let featuredPosts: IFeaturedPost[] = [];
  try {
    featuredPosts = [
      await getFeaturedPostBySlug(
        "new-lol-champion-naafiri-revealed-in-animated-cinematic"
      )
    ];
  } catch (e) {
    console.log("Fetching posts failed, with cause:", e);
  }

  return { props: { featuredPosts }, revalidate: 60 * 5 };
};
