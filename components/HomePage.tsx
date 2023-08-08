import { IHomePageProps } from "@/interfaces/pageProps";
import React, { FC } from "react";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedVideos from "@/components/FeaturedVideos";
import PostList from "@/components/PostList";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import parse from "html-react-parser";
import { replaceImage } from "@/utils/replaceImage";
import Head from "next/head";
import { parseSeo } from "@/utils/parseSeo";

const HomePage: FC<IHomePageProps> = ({
  featuredPosts,
  featuredReviews,
  featuredVideos,
  homeDescription,
  homeTags,
  paginatedPosts,
  pageSeo
}) => {
  return (
    <>
      <Head>{parse(pageSeo, { replace: parseSeo })}</Head>
      <FeaturedPosts featuredPosts={featuredPosts} />
      <FeaturedVideos featuredVideos={featuredVideos.slice(0, 3)} />
      <div className="flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex-1">
          <PostList paginatedPosts={paginatedPosts} title="Latest news" />
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={homeTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos.slice(3)} />
        </div>
      </div>
      <div className="parsed-wp-content my-5">
        {parse(homeDescription, { replace: replaceImage })}
      </div>
    </>
  );
};

export default HomePage;
