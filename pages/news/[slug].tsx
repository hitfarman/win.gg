import { getPostBySlug } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import {
  FeaturedArticles,
  FeaturedOptionTags,
  IAllOptionsResponse
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
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon
} from "next-share";
import { useRouter } from "next/router";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";
import { extractFeaturedPosts } from "@/utils/extractFeaturedPosts";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { IReaction } from "@/interfaces/reactions";
import { getReactionsByPostId } from "@/axios/reactions";
import Reactions from "@/components/Reactions";

type Props = {
  featuredPosts: IFeaturedPost[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  featuredTags: IFeaturedTag[];
  post: IPostDetails;
  reactions: IReaction[];
};

const PostPage: NextPage<Props> = ({
  featuredPosts,
  featuredReviews,
  featuredTags,
  featuredVideos,
  post,
  reactions
}) => {
  const { asPath } = useRouter();
  const shareUrl = `https://${process.env.NEXT_PUBLIC_FE_DOMAIN}${asPath}`;
  return (
    <>
      <Head>
        {parse(post.seo.fullHead)}
        {/* TODO is there a consistent way to do this with next/script? */}
        <script async src="https://platform.twitter.com/widgets.js" />
        <script async src="https://player.twitch.tv/js/embed/v1.js" />
      </Head>
      <Breadcrumbs
        crumbs={[
          {
            text: post.categories.edges[0].node.name,
            url: `/${post?.categories.edges[0].node.slug}`
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
            // TODO there is no featuredImage
            src={post.featuredImage?.node.sourceUrl}
            alt={post.featuredImage?.node.altText}
            title={post.featuredImage?.node.title}
            className="mb-5"
            priority
            key={post.featuredImage?.node.sourceUrl}
          />
          <div className="mb-5 flex flex-wrap gap-2">
            {post.categories.edges.map((category) => (
              <Link
                key={`${category.node.name}-category-btn`}
                href={`/${category.node.slug}`}
                className="win-primary-button"
              >
                {category.node.name}
              </Link>
            ))}
            {post.tags.nodes.map((tag) => (
              <Link
                key={`${tag.name}-tag-btn`}
                href={`/${tag.slug}`}
                className="win-primary-button"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <h2 className="mb-5 font-header text-2xl font-semibold">
            {post.title}
          </h2>

          <div className="mb-5 flex gap-2 text-sm font-bold text-gray-500">
            <Link
              href={`/news/author/${post.author.node.slug}`}
              className="transition-colors hover:text-gray-300"
            >
              By {`${post.author.node.firstName} ${post.author.node.lastName}`}
            </Link>
            <p>|</p>
            <p>{formatDate(post.date)}</p>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            <div className="my-2 flex flex-wrap gap-2">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round className="win-social-icon" />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={32} round className="win-social-icon" />
              </TwitterShareButton>
              <PinterestShareButton media="" url={shareUrl}>
                <PinterestIcon size={32} round className="win-social-icon" />
              </PinterestShareButton>
              <RedditShareButton url={shareUrl}>
                <RedditIcon size={32} round className="win-social-icon" />
              </RedditShareButton>
            </div>
            <div className="my-2 w-max rounded-md bg-win-gray px-4 py-2 text-sm  font-semibold">
              Reading time:{" "}
              {calculateReadingTime(post.content) === 0
                ? "<1"
                : calculateReadingTime(post.content)}{" "}
              min
            </div>
          </div>

          <div className="parsed-wp-content">
            {parse(post.content, { replace: replaceImage })}
          </div>
          <Reactions postId={post.databaseId} reactions={reactions} />
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
  let reactions: IReaction[] = [];

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

    featuredTags = extractFeaturedTags(
      options[optionsTags.tags] as FeaturedOptionTags
    );

    featuredReviews = extractFeaturedReviews(options);

    featuredVideos = extractFeaturedVideos(options);

    featuredPosts = await extractFeaturedPosts(
      options[optionsTags["featured-articles"]] as FeaturedArticles
    );
  }

  if (post) {
    try {
      reactions = await getReactionsByPostId(post.databaseId);
    } catch (e) {
      console.log(
        `Fetching reactions by postId(${post.databaseId}) failed in getServerSideProps, with cause:`,
        e
      );
    }
  }

  return post
    ? {
        props: {
          featuredPosts,
          featuredVideos,
          featuredReviews,
          featuredTags,
          post,
          reactions
        }
      }
    : { notFound: true };
};
