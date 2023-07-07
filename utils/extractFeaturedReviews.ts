import { IAllOptionsResponse } from "@/interfaces/options";
import { IFeaturedReview } from "@/interfaces/reviews";

export const extractFeaturedReviews = (
  options: IAllOptionsResponse
): IFeaturedReview[] => {
  return [
    options["featured_review_1"],
    options["featured_review_2"],
    options["featured_review_3"]
  ].map((review) => ({
    id: review.ID,
    name: review.post_title,
    slug: review.post_name
  }));
};
