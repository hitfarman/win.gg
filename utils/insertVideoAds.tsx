import { DEFAULT_VIDEO_LOOKUP_CATEGORY } from "@/constants/posts";

const characterLimit = 1800;

const insertAfterNth = (
  opener: string,
  target: string,
  n: number,
  insert: string,
  source: string
): string => {
  const parts = source.split(target);
  if (parts.length > n) {
    const partToInsert = parts[n];
    parts[n] = partToInsert + target + insert + opener;
    return parts.join(target).replaceAll(`${opener}${target}`, "");
  }
  return source.replaceAll(`${opener}${target}`, "");
};

const pTagPattern = /<p\b[^>]*>(.*?)<\/p>/gi;

export const insertVideoAds = (wpContent: string): string => {
  let videoAdToInsert = `<div class="py-8" id="inline-video-ad"></div>`;
  let contentResult = wpContent;

  // Inserting ads into content
  const pTags = wpContent.match(pTagPattern);
  if (pTags && pTags.length >= 2) {
    const modifiedWpContent = insertAfterNth(
      "<p>",
      "</p>",
      1,
      videoAdToInsert,
      wpContent
    );

    contentResult = modifiedWpContent;
  }

  return contentResult;
};

export const getScriptToInsert = (category: string): string => {
  return `<script
      data-cfasync="false"
      async
      type="text/javascript"
      src="//go.trvdp.com/init/7597.js?pid=5977"
    ></script>`;
};
