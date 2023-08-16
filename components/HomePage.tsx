import { IHomePageProps } from "@/interfaces/pageProps";
import React, { FC } from "react";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedVideos from "@/components/FeaturedVideos";
import PostList from "@/components/PostList";
import parse from "html-react-parser";
import { parseWpContent } from "@/utils/parseWpContent";
import Head from "next/head";
import { parseSeo } from "@/utils/parseSeo";
import FeaturedSidebar from "./FeaturedSidebar";

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
          <FeaturedSidebar
            featuredReviews={featuredReviews}
            featuredTags={homeTags}
            featuredVideos={featuredVideos}
          />
        </div>
      </div>
      <div className="parsed-wp-content my-5">
        {parse(homeDescription, { replace: parseWpContent })}
      </div>
    </>
  );
};

export default HomePage;
