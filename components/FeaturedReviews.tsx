import React from "react";
import FeaturedReviewItem from "./FeaturedReviewItem";

type Props = {};

// TODO recieve props
const reviews = [
  {
    name: "The best $800 gaming laptops on the market in 2023",
    slug: "the-best-800-gaming-laptops-on-the-market-in-2023",
    id: 1
  },
  {
    name: "The best gaming mousepads to buy in 2023",
    slug: "the-best-gaming-mousepads-to-buy-in-2023",
    id: 2
  },
  {
    name: "Maono PD400X and DM30 microphone review",
    slug: "maono-pd400x-and-dm30-microphone-review3",
    id: 3
  }
];

const FeaturedReviews = (props: Props) => {
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
