import React, { FC } from "react";
import FeaturedReviewItem from "./FeaturedReviewItem";
import { IFeaturedReview } from "@/interfaces/reviews";

type Props = {
  reviews: IFeaturedReview[];
};

const FeaturedReviews: FC<Props> = ({ reviews }) => {
  return (
    <div>
      <h3 className="border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        Reviews
      </h3>
      <div className="flex flex-col gap-5 py-10">
        {reviews.map((review, i) => (
          <FeaturedReviewItem key={review.id} index={i + 1} {...review} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedReviews;
