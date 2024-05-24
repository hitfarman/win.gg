import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import React, { FC } from "react";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import Link from "next/link";
import Image from "next/image";
import sidebarAd from "@/assets/img/Stake-Banners-336x280.jpg";

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
      <Link
        href="https://stake.us/?c=L7mkCg40"
        className="flex flex-row justify-center"
      >
        <Image
          src={sidebarAd}
          alt="Stake"
          rel="nofollow"
          className="mb-5 object-cover"
        />
      </Link>
      <FeaturedVideosSecondary featuredVideos={featuredVideos} />
    </div>
  );
};

export default FeaturedSidebar;
