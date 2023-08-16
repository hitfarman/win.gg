import { getCategoryInfoBySlug, getCategorySlugs } from "@/apollo/categories";
import { getPaginatedPosts } from "@/apollo/posts";
import { getAllTagSlugs, getTagInfoBySlug } from "@/apollo/tags";
import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategorySeo from "@/components/CategorySeo";
import FeaturedPosts from "@/components/FeaturedPosts";
import PostList from "@/components/PostList";
import { DEFAULT_REVALIDATION_TIME, POSTS_PER_PAGE } from "@/constants/posts";
import { ICategoryInfo, ICategorySlug } from "@/interfaces/categories";
import {
  FeaturedArticles,
  FeaturedOptionTags,
  IAllOptionsResponse
} from "@/interfaces/options";
import { IFeaturedPost, IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag, ITagSlug } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
import { getFeaturedOptionKeyNamesByCategorySlug } from "@/utils/getFeaturedOptionKeyNamesByCategorySlug";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage
} from "next";
import React from "react";
import parse from "html-react-parser";
import { parseWpContent } from "@/utils/parseWpContent";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";
import { extractFeaturedPosts } from "@/utils/extractFeaturedPosts";
import FeaturedSidebar from "@/components/FeaturedSidebar";

type Props = {
  featuredPosts: IFeaturedPost[];
  categoryDescription: string;
  categoryTags: IFeaturedTag[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  paginatedPosts: IPaginatedPostsResponse | null;
  categoryInfo: ICategoryInfo | null;
};

const CategoryPage: NextPage<Props> = ({
  featuredPosts,
  categoryDescription,
  featuredVideos,
  categoryTags,
  featuredReviews,
  paginatedPosts,
  categoryInfo
}) => {
  return (
    <>
      <CategorySeo categoryInfo={categoryInfo} />
      {featuredPosts.length > 0 && (
        <FeaturedPosts featuredPosts={featuredPosts} />
      )}
      <div className="mt-10">
        <Breadcrumbs
          crumbs={categoryInfo ? categoryInfo.seo.breadcrumbs : []}
        />
      </div>
      <div className="flex flex-col gap-10 py-5 md:flex-row">
        <div className="flex-1">
          <PostList
            paginatedPosts={paginatedPosts}
            title={categoryInfo?.name}
          />
        </div>
        <div className="md:w-4/12">
          <FeaturedSidebar
            featuredReviews={featuredReviews}
            featuredTags={categoryTags}
            featuredVideos={featuredVideos}
          />
        </div>
      </div>

      <div className="parsed-wp-content my-5">
        {parse(categoryDescription, { replace: parseWpContent })}
      </div>
    </>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let categories: ICategorySlug[] = [];
  let tags: ITagSlug[] = [];
  try {
    categories = await getCategorySlugs();
  } catch (e) {
    console.log(
      "Fetching categories failed, generating paths for categories with []",
      e
    );
  }

  try {
    tags = await getAllTagSlugs();
  } catch (e) {
    console.log("Fetching tags failed, generating paths for tags with []", e);
  }

  const paths: { params: { params: string[] } }[] = [
    ...tags.map((tag) => ({
      params: { params: [tag.slug] }
    })),
    ...categories.map((category) => ({
      params: { params: [category.node.slug] }
    }))
  ];
  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context.params as { params: string[] };
  const slug = params[0];
  const pageNumber = params[2];

  let featuredPosts: IFeaturedPost[] = [];
  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let categoryTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let categoryDescription = "";
  let paginatedPosts: IPaginatedPostsResponse | null = null;
  let categoryInfo: ICategoryInfo | null = null;

  try {
    categoryInfo = await getCategoryInfoBySlug(slug);
  } catch (e) {
    console.log("Fetching category info failed with cause:", e);
  }

  try {
    options = await getAllOptions();
  } catch (e) {
    console.log("Fetching options failed in getStaticProps, with cause:", e);
  }

  if (options) {
    // These props are currently the same for both category and tags sub-pages
    featuredReviews = extractFeaturedReviews(options);
    featuredVideos = extractFeaturedVideos(options);
  }

  if (categoryInfo) {
    // The slug was for a category
    // Run all logic for category
    categoryInfo.seo.breadcrumbs = [
      { text: categoryInfo.name, url: `/${slug}` }
    ];

    if (options) {
      const categoryOptionsTag = getFeaturedOptionKeyNamesByCategorySlug(slug);
      categoryDescription = categoryOptionsTag.description
        ? (options[categoryOptionsTag.description] as string)
        : "";
      categoryTags = extractFeaturedTags(
        options[categoryOptionsTag.tags] as FeaturedOptionTags
      );
      featuredPosts = await extractFeaturedPosts(
        options[categoryOptionsTag["featured-articles"]] as FeaturedArticles,
        slug
      );
    }

    try {
      paginatedPosts = await getPaginatedPosts({
        size: POSTS_PER_PAGE,
        offset: pageNumber ? calculatePaginationOffset(Number(pageNumber)) : 0,
        categoryName: slug
      });
    } catch (e) {
      console.log("Fetching paginated posts failed with cause:", e);
    }
  } else {
    // The slug was for a tag
    // Run all logic for tag
    if (options) {
      categoryTags = extractFeaturedTags(options["default-tags"]);
    }

    try {
      paginatedPosts = await getPaginatedPosts({
        size: POSTS_PER_PAGE,
        offset: pageNumber ? calculatePaginationOffset(Number(pageNumber)) : 0,
        tag: slug
      });
    } catch (e) {
      console.log("Fetching paginated posts failed with cause:", e);
    }

    try {
      categoryInfo = await getTagInfoBySlug(slug);
      categoryInfo.seo.breadcrumbs = [
        { text: categoryInfo.name, url: `/${slug}` }
      ];
    } catch (e) {
      console.log("Fetching category info failed with cause:", e);
    }

    if (!categoryInfo) {
      return { notFound: true };
    }
  }

  return {
    props: {
      featuredPosts,
      categoryDescription,
      categoryTags,
      featuredVideos,
      featuredReviews,
      paginatedPosts,
      categoryInfo
    },
    revalidate: DEFAULT_REVALIDATION_TIME
  };
};
