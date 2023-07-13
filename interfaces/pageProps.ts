import { IFeaturedPost, IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo, IPaginatedVideosResponse } from "@/interfaces/videos";

export interface IHomePageProps {
  featuredPosts: IFeaturedPost[];
  homeDescription: string;
  homeTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  paginatedPosts: IPaginatedPostsResponse | null;
}

export interface IVideosPageProps {
  featuredTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  paginatedVideos: IPaginatedVideosResponse | null;
}
