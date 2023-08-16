import { insertVideoAds } from "@/utils/insertVideoAds";
import { parseWpContent } from "@/utils/parseWpContent";
import { FC } from "react";
import parse from "html-react-parser";

type Props = {
  postContent: string;
  postCategory: string;
};

const ParsedPostContent: FC<Props> = ({ postCategory, postContent }) => {
  return (
    <div className="parsed-wp-content">
      {parse(insertVideoAds(postContent, postCategory), {
        replace: parseWpContent
      })}
    </div>
  );
};

export default ParsedPostContent;
