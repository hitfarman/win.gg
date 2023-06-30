import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import LazyYoutubeVideo from "./LazyYoutubeVideo";

type Props = {
  featuredVideos: IFeaturedVideo[];
};

const FeaturedVideos: FC<Props> = ({ featuredVideos }) => {
  return (
    <div className="full-bleed-gray mt-10 bg-win-gray pb-5 pt-10">
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {featuredVideos.slice(0, 3).map((video) => (
          <LazyYoutubeVideo
            key={video.url}
            url={video.url}
            height={250}
            width={350}
          />
        ))}
      </div>

      <button className="win-primary-button mx-auto">Show more videos</button>
    </div>
  );
};

export default FeaturedVideos;
