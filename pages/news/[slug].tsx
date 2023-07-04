import { getFeaturedPostBySlug, getPostBySlug } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import {
  IAllOptionsResponse,
  IOptionFeaturedPost,
  IOptionTag
} from "@/interfaces/options";
import { IFeaturedPost, IPostDetails } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo } from "@/interfaces/videos";
import { getFeaturedOptionKeyNamesByCategorySlug } from "@/utils/getFeaturedOptionKeyNamesByCategorySlug";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import parse from "html-react-parser";
import { replaceImage } from "@/utils/replaceImage";
import RecommendedPosts from "@/components/RecommendedPosts";
import Head from "next/head";
import Script from "next/script";
import { calculateReadingTime } from "@/utils/calculateReadingTime";

type Props = {
  featuredPosts: IFeaturedPost[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  featuredTags: IFeaturedTag[];
  post: IPostDetails;
};

const PostPage: NextPage<Props> = ({
  featuredPosts,
  featuredReviews,
  featuredTags,
  featuredVideos,
  post
}) => {
  return (
    <>
      <Script src="https://platform.twitter.com/widgets.js" />
      <Script src="https://player.twitch.tv/js/embed/v1.js" />
      <Head>{parse(post.seo.fullHead)}</Head>
      <Breadcrumbs
        crumbs={[
          {
            text: post.categories.edges[0].node.name,
            url: `/category/${post?.categories.edges[0].node.slug}`
          },
          {
            text: post.title,
            url: `/news/${post?.slug}`
          }
        ]}
      />
      <div className="flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex-1">
          <Image
            width={800}
            height={350}
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText}
            title={post.featuredImage.node.title}
            className="mb-5"
            priority
          />
          <div className="mb-5 flex flex-wrap">
            {post.categories.edges.map((category) => (
              <Link
                key={`${category.node.name}-category-btn`}
                href={`/category/${category.node.slug}`}
                className="win-primary-button"
              >
                {category.node.name}
              </Link>
            ))}
          </div>

          <h2 className="mb-5 font-header text-2xl font-semibold">
            {post.title}
          </h2>

          <div className="mb-5 flex gap-2 text-sm font-bold text-gray-500">
            <p>
              By {`${post.author.node.firstName} ${post.author.node.lastName}`}
            </p>
            <p>|</p>
            <p>{formatDate(post.date)}</p>
          </div>

          <div className="mb-5 w-max rounded-md bg-win-gray px-4 py-2 text-sm font-semibold">
            Reading time:{" "}
            {calculateReadingTime(post.content) === 0
              ? "<1"
              : calculateReadingTime(post.content)}{" "}
            min
          </div>
          <div className="parsed-blog-post">
            {parse(post.content, { replace: replaceImage })}
          </div>
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={featuredTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos} />
        </div>
      </div>
      <RecommendedPosts posts={featuredPosts} />
    </>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-control",
    "public, s-maxage=300, stale-while-revalidate=30"
  );
  const { slug } = params as { slug: string };

  let featuredPosts: IFeaturedPost[] = [];
  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let featuredTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let post: IPostDetails | null = null;

  try {
    post = await getPostBySlug(slug);
  } catch (e) {
    console.log(
      "Fetching post details failed in getServerSideProps, with cause:",
      e
    );
  }

  try {
    options = await getAllOptions();
  } catch (e) {
    console.log(
      "Fetching options failed in getServerSideProps, with cause:",
      e
    );
  }

  if (options) {
    const optionsTags = getFeaturedOptionKeyNamesByCategorySlug(
      post?.categories.edges.length ? post.categories.edges[0].node.slug : ""
    );

    featuredTags = (options[optionsTags.tags] as IOptionTag[]).map(
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
      options[optionsTags["featured-articles"]] as IOptionFeaturedPost[]
    ).map((post) => post.post_name);
    // TODO err handling
    featuredPosts = await Promise.all(
      featuredPostSlugs.map((slug) => getFeaturedPostBySlug(slug))
    );
  }

  return post
    ? {
        props: {
          featuredPosts,
          featuredVideos,
          featuredReviews,
          featuredTags,
          post
        }
      }
    : { notFound: true };
};
