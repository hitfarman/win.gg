import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import LazyYoutubeVideo from "./LazyYoutubeVideo";

type Props = {
  featuredVideos: IFeaturedVideo[];
};

const FeaturedVideosSecondary: FC<Props> = ({ featuredVideos }) => {
  return (
    <div className="grid grid-cols-1 gap-5">
      {featuredVideos.map((video) => (
        <LazyYoutubeVideo
          key={video.url}
          url={video.url}
          height={250}
          width={350}
          sizesForNextImg="(max-width: 768px) 100vw, 33vw"
        />
      ))}
    </div>
  );
};

export default FeaturedVideosSecondary;
