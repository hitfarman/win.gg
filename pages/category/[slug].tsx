import { getCategoryInfoBySlug, getCategorySlugs } from "@/apollo/categories";
import { getFeaturedPostBySlug, getPaginatedPosts } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import PostList from "@/components/PostList";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { ICategoryInfo, ICategorySlug } from "@/interfaces/categories";
import {
  IAllOptionsResponse,
  IOptionFeaturedPost,
  IOptionTag
} from "@/interfaces/options";
import { IFeaturedPost, IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { getFeaturedOptionKeyNamesByCategorySlug } from "@/utils/getFeaturedOptionKeyNamesByCategorySlug";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage
} from "next";
import React from "react";

type Props = {
  featuredPosts: IFeaturedPost[];
  categoryDescription: string;
  categoryTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  paginatedPosts: IPaginatedPostsResponse | null;
  slug: string;
  categoryInfo: ICategoryInfo | null;
};

const CategoryPage: NextPage<Props> = ({
  featuredPosts,
  categoryDescription,
  featuredVideos,
  categoryTags,
  featuredReviews,
  paginatedPosts,
  slug,
  categoryInfo
}) => {
  return (
    <>
      <FeaturedPosts featuredPosts={featuredPosts} />
      <div className="mt-10">
        <Breadcrumbs
          crumbs={categoryInfo ? categoryInfo.seo.breadcrumbs : []}
        />
      </div>
      <div className="flex flex-col gap-10 py-5 md:flex-row">
        <div className="flex-1">
          <PostList
            paginatedPosts={paginatedPosts}
            categorySlug={slug}
            title={categoryInfo?.name}
          />
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={categoryTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos} />
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: categoryDescription }}></div>
    </>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let categories: ICategorySlug[] = [];
  try {
    categories = await getCategorySlugs();
  } catch (e) {
    console.log("Fetching categories failed, generating paths with []");
  }

  const paths: { params: { slug: string } }[] = categories.map((category) => ({
    params: { slug: category.node.slug }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params as { slug: string };
  // TODO what if requested slug is not found?

  let featuredPosts: IFeaturedPost[] = [];
  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let categoryTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let categoryDescription = "";
  let paginatedPosts: IPaginatedPostsResponse | null = null;
  let categoryInfo: ICategoryInfo | null = null;

  try {
    options = await getAllOptions();
  } catch (e) {
    console.log("Fetching options failed in getStaticProps, with cause:", e);
  }

  if (options) {
    const categoryOptionsTag = getFeaturedOptionKeyNamesByCategorySlug(slug);
    categoryDescription = categoryOptionsTag.description
      ? (options[categoryOptionsTag.description] as string)
      : "";
    categoryTags = (options[categoryOptionsTag.tags] as IOptionTag[]).map(
      (optionTag) => ({
        name: optionTag.name,
        slug: optionTag.slug,
        term_id: optionTag.term_id
      })
    );
    featuredReviews = [
      options["featured_review_1"],
      options["featured_review_2"],
      options["featured_review_3"]
    ].map((review) => ({
      id: review.ID,
      name: review.post_title,
      slug: review.post_name
    }));

    featuredVideos = Object.keys(options)
      .filter((key) => key.includes("featured_video_"))
      .map((key) => ({
        url: (options![key as keyof IAllOptionsResponse] || "") as string
      }));

    const featuredPostSlugs = (
      options[categoryOptionsTag["featured-articles"]] as IOptionFeaturedPost[]
    ).map((post) => post.post_name);
    // TODO err handling
    featuredPosts = await Promise.all(
      featuredPostSlugs.map((slug) => getFeaturedPostBySlug(slug))
    );
  }

  try {
    paginatedPosts = await getPaginatedPosts({
      first: POSTS_PER_PAGE,
      after: null,
      before: null,
      last: null,
      categoryName: slug
    });
  } catch (e) {
    console.log("Fetching paginated posts failed with cause:", e);
  }

  try {
    categoryInfo = await getCategoryInfoBySlug(slug);
    categoryInfo.seo.breadcrumbs = [
      { text: categoryInfo.name, url: `/category/${slug}` }
    ];
  } catch (e) {
    console.log("Fetching category info failed with cause:", e);
  }

  return {
    props: {
      featuredPosts,
      categoryDescription,
      categoryTags,
      featuredVideos,
      featuredReviews,
      paginatedPosts,
      slug,
      categoryInfo
    },
    revalidate: 60 * 5
  };
};
