import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import LazyYoutubeVideo from "@/components/LazyYoutubeVideo";
import InsertedAd from "@/components/InsertedAd";

type Props = {
  featuredVideos: IFeaturedVideo[];
};

const FeaturedVideosSecondary: FC<Props> = ({ featuredVideos }) => {
  return (
    <div className="grid grid-cols-1 gap-5">
      {featuredVideos.slice(3).map((video) => (
        <LazyYoutubeVideo
          key={video.url}
          url={video.url}
          height={250}
          width={350}
          sizesForNextImg="(max-width: 768px) 100vw, 33vw"
        />
      ))}
      <InsertedAd
        id="td-bottom-mpu-1"
        className="z-0 min-h-[250px]"
        placeholderClassName="max-h-[300px]"
      />
    </div>
  );
};

export default FeaturedVideosSecondary;
