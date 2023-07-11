import { getFeaturedPostBySlug } from "@/apollo/posts";
import { FeaturedArticles, IOptionFeaturedPost } from "@/interfaces/options";
import { IFeaturedPost } from "@/interfaces/posts";

export const extractFeaturedPosts = async (
  optionsPosts: FeaturedArticles
): Promise<IFeaturedPost[]> => {
  const featuredPostSlugs = optionsPosts
    ? optionsPosts.map((post) => post.post_name)
    : [];

  const featuredPosts = await Promise.all(
    featuredPostSlugs.map((slug) => getFeaturedPostBySlug(slug))
  );

  return featuredPosts;
};
