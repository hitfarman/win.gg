import { insertVideoAds } from "@/utils/insertVideoAds";
import { parseWpContent } from "@/utils/parseWpContent";
import { FC } from "react";
import parse from "html-react-parser";

type Props = {
  isReviewPage: boolean;
  postContent: string;
  postCategory: string;
};

const ParsedPostContent: FC<Props> = ({
  isReviewPage,
  postCategory,
  postContent
}) => {
  return (
    <div className={`parsed-wp-content ${isReviewPage ? "yellow-links" : ""}`}>
      {parse(insertVideoAds(postContent, postCategory), {
        replace: parseWpContent
      })}
    </div>
  );
};

export default ParsedPostContent;
