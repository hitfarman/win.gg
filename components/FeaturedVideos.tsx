import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import LazyYoutubeVideo from "./LazyYoutubeVideo";
import Link from "next/link";
import { frontendOrigin } from "@/constants/general";

type Props = {
  featuredVideos: IFeaturedVideo[];
};

const FeaturedVideos: FC<Props> = ({ featuredVideos }) => {
  return (
    <div className="full-bleed-gray mt-10 bg-win-gray pb-5 pt-10">
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {featuredVideos.map((video) => (
          <LazyYoutubeVideo
            key={video.url}
            url={video.url}
            height={250}
            width={350}
          />
        ))}
      </div>

      <Link
        href={`${frontendOrigin}/news/videos`}
        className="win-primary-button mx-auto w-max"
      >
        Show more videos
      </Link>
    </div>
  );
};

export default FeaturedVideos;
