import { getFeaturedPostBySlug, getPaginatedPosts } from "@/apollo/posts";
import { FeaturedArticles } from "@/interfaces/options";
import { IFeaturedPost } from "@/interfaces/posts";

export const extractFeaturedPosts = async (
  optionsPosts: FeaturedArticles,
  categorySlugForFill?: string,
  excludedPostId?: number
): Promise<IFeaturedPost[]> => {
  let featuredPostSlugs = optionsPosts
    ? optionsPosts.map((post) => post.post_name)
    : [];

  if (featuredPostSlugs.length < 3) {
    const numberOfPostsNeededForFill = 3 - featuredPostSlugs.length;

    const postsResponse = await getPaginatedPosts({
      categoryName: categorySlugForFill || "",
      offset: 0,
      size: numberOfPostsNeededForFill + 1
    });

    const fillerPostSlugs = postsResponse.posts.edges
      .filter((post) => post.node.databaseId !== excludedPostId)
      .slice(0, numberOfPostsNeededForFill)
      .map((post) => post.node.slug);

    featuredPostSlugs = [...featuredPostSlugs, ...fillerPostSlugs];
  }

  const featuredPosts = await Promise.all(
    featuredPostSlugs.slice(0, 3).map((slug) => getFeaturedPostBySlug(slug))
  );

  return featuredPosts;
};
