import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";

type Props = {
  featuredTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
};

const FeaturedSidebar: FC<Props> = ({
  featuredReviews,
  featuredTags,
  featuredVideos
}) => {
  return (
    <div>
      <FeaturedTags tags={featuredTags} />
      <FeaturedReviews reviews={featuredReviews} />
      <FeaturedVideosSecondary featuredVideos={featuredVideos} />
    </div>
  );
};

export default FeaturedSidebar;
