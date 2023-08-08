import { IVideosPageProps } from "@/interfaces/pageProps";
import React, { FC } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import VideoList from "@/components/VideoList";
import FeaturedSidebar from "@/components/FeaturedSidebar";

const VideosPage: FC<IVideosPageProps> = ({
  featuredReviews,
  featuredTags,
  featuredVideos,
  paginatedVideos
}) => {
  return (
    <>
      <Head>
        <title>Videos Archive - WIN.gg</title>
        <meta property="og:title" content="Videos Archive" />
      </Head>
      <div className="mt-10">
        <Breadcrumbs crumbs={[{ text: "Videos", url: "/news/videos" }]} />
      </div>
      <div className="flex flex-col gap-10 py-5 md:flex-row">
        <div className="flex-1">
          <VideoList paginatedVideos={paginatedVideos} />
        </div>
        <div className="md:w-4/12">
          <FeaturedSidebar
            featuredReviews={featuredReviews}
            featuredTags={featuredTags}
            featuredVideos={featuredVideos}
          />
        </div>
      </div>
    </>
  );
};

export default VideosPage;
