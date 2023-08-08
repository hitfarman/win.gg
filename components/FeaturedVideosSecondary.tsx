import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import LazyYoutubeVideo from "./LazyYoutubeVideo";
import InsertedAd from "@/components/InsertedAd";

type Props = {
  featuredVideos: IFeaturedVideo[];
};

const FeaturedVideosSecondary: FC<Props> = ({ featuredVideos }) => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <InsertedAd id="direct-ad-above-video" className="min-h-[250px]" />
      {featuredVideos.slice(0, 2).map((video) => (
        <LazyYoutubeVideo
          key={video.url}
          url={video.url}
          height={250}
          width={350}
          sizesForNextImg="(max-width: 768px) 100vw, 33vw"
        />
      ))}
      <InsertedAd id="video-inset-ad" className="min-h-[250px]" />
      {featuredVideos.slice(2).map((video) => (
        <LazyYoutubeVideo
          key={video.url}
          url={video.url}
          height={250}
          width={350}
          sizesForNextImg="(max-width: 768px) 100vw, 33vw"
        />
      ))}
      <InsertedAd id="td-bottom-mpu-1" className="min-h-[250px]" />
    </div>
  );
};

export default FeaturedVideosSecondary;
