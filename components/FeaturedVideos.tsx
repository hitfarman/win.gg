import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";

type Props = {
  featuredVideos: IFeaturedVideo[];
};

const FeaturedVideos: FC<Props> = ({ featuredVideos }) => {
  return (
    <div className="full-bleed-gray mt-10 bg-win-gray pb-5 pt-10">
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="h-36 w-full bg-win-slate">Video 1</div>
        <div className="h-36 w-full bg-win-slate">Video 2</div>
        <div className="h-36 w-full bg-win-slate">Video 3</div>
      </div>

      <button className="win-primary-button mx-auto">Show more videos</button>
    </div>
  );
};

export default FeaturedVideos;
