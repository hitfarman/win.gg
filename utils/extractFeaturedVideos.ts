import { IAllOptionsResponse } from "@/interfaces/options";
import { IFeaturedVideo } from "@/interfaces/videos";

export const extractFeaturedVideos = (
  options: IAllOptionsResponse
): IFeaturedVideo[] => {
  return Object.keys(options)
    .filter((key) => key.includes("featured_video_"))
    .map((key) => ({
      url: (options![key as keyof IAllOptionsResponse] || "") as string
    }));
};
