import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import InsertedAd from "@/components/InsertedAd";

type Props = {
  featuredTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  isReviewPage?: boolean;
};

const FeaturedSidebar: FC<Props> = ({
  featuredReviews,
  featuredTags,
  featuredVideos,
  isReviewPage
}) => {
  return (
    <div>
      <FeaturedTags tags={featuredTags} isReviewPage={isReviewPage} />
      <InsertedAd id="td-top-mpu-1" className="mb-5 min-h-[250px]" />
      <FeaturedReviews reviews={featuredReviews} isReviewPage={isReviewPage} />
      <FeaturedVideosSecondary featuredVideos={featuredVideos} />
    </div>
  );
};

export default FeaturedSidebar;
