import { getFeaturedPostBySlug } from "@/apollo/posts";
import { IOptionFeaturedPost } from "@/interfaces/options";
import { IFeaturedPost } from "@/interfaces/posts";

export const extractFeaturedPosts = async (
  optionsPosts: IOptionFeaturedPost[]
): Promise<IFeaturedPost[]> => {
  const featuredPostSlugs = optionsPosts.map((post) => post.post_name);

  const featuredPosts = await Promise.all(
    featuredPostSlugs.map((slug) => getFeaturedPostBySlug(slug))
  );

  return featuredPosts;
};
