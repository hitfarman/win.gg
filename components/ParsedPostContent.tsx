import { getScriptToInsert, insertVideoAds } from "@/utils/insertVideoAds";
import { parseWpContent } from "@/utils/parseWpContent";
import { FC, useEffect, useMemo } from "react";
import parse from "html-react-parser";

type Props = {
  postContent: string;
  postCategory: string;
};

const ParsedPostContent: FC<Props> = ({ postContent, postCategory }) => {
  const parsedContent = useMemo(
    () =>
      parse(insertVideoAds(postContent), {
        replace: parseWpContent
      }),
    [postContent]
  );

  useEffect(() => {
    // Inline video script
    let inlineScriptHtml = "<div></div>";

    inlineScriptHtml = getScriptToInsert(postCategory);

    const inlineVideoScript = document
      .createRange()
      .createContextualFragment(inlineScriptHtml);

    const inlineVideoPlaceholderDiv =
      document.getElementById("inline-video-ad");

    if (
      inlineVideoPlaceholderDiv &&
      inlineVideoPlaceholderDiv.children.length === 0
    ) {
      inlineVideoPlaceholderDiv.append(inlineVideoScript);
    }
  }, [parsedContent, postCategory]);

  return <div className="parsed-wp-content">{parsedContent}</div>;
};

export default ParsedPostContent;
