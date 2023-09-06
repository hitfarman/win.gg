import { getPaginatedPosts, getPostBySlug } from "@/apollo/posts";
import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  FeaturedArticles,
  FeaturedOptionTags,
  IAllOptionsResponse
} from "@/interfaces/options";
import {
  IFeaturedPost,
  IPaginatedPostsResponse,
  IPostDetails
} from "@/interfaces/posts";
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
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import parse from "html-react-parser";
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
import {
  DEFAULT_REVALIDATION_TIME,
  DEFAULT_VIDEO_LOOKUP_CATEGORY
} from "@/constants/posts";
import dynamic from "next/dynamic";
import { parseSeo } from "@/utils/parseSeo";
import FeaturedSidebar from "@/components/FeaturedSidebar";
import { stripQueryFromPath } from "@/utils/stripQueryFromPath";

const ParsedPostContent = dynamic(
  () => import("@/components/ParsedPostContent"),
  {
    ssr: false
  }
);
const Reactions = dynamic(() => import("@/components/Reactions"), {
  ssr: false
});

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
  const { asPath } = useRouter();
  const cleanAsPath = stripQueryFromPath(asPath);
  const shareUrl = `https://${process.env.NEXT_PUBLIC_FE_DOMAIN}${cleanAsPath}`;
  const postCategory = useMemo<string>(() => {
    if (post.categories.edges.length > 0) {
      return post.categories.edges[0].node.slug;
    }
    return DEFAULT_VIDEO_LOOKUP_CATEGORY;
  }, [post]);

  useEffect(() => {
    // twitterScript
    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    // twitchScript
    const twitchScript = document.createElement("script");
    twitchScript.src = "https://player.twitch.tv/js/embed/v1.js";
    twitchScript.async = true;
    document.body.appendChild(twitchScript);

    return () => {
      document.body.removeChild(twitterScript);
      document.body.removeChild(twitchScript);
    };
  }, [cleanAsPath]);

  return (
    <>
      <Head>
        {parse(post.seo.fullHead, {
          replace: parseSeo
        })}
        <title>{post.seo.title}</title>
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
          <div className="relative mb-5 h-[350px] w-full md:max-w-[800px]">
            <Image
              // TODO there is no featuredImage
              src={post.featuredImage?.node.sourceUrl}
              alt={post.featuredImage?.node.altText}
              title={post.featuredImage?.node.title}
              className="object-cover"
              sizes="(max-width: 768px) 100vw,(max-width: 1024px) 50vw, 66vw"
              fill
              priority
              key={post.featuredImage?.node.sourceUrl}
            />
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {post.categories.edges.map((category) => (
              <Link
                key={`${category.node.name}-category-btn`}
                href={`/${category.node.slug}`}
                className="win-tag-button"
              >
                {category.node.name}
              </Link>
            ))}
            {post.tags.nodes.map((tag) => (
              <Link
                key={`${tag.name}-tag-btn`}
                href={`/${tag.slug}`}
                className="win-tag-button"
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

          <ParsedPostContent
            postCategory={postCategory}
            postContent={post.content}
          />

          <Reactions key={post.databaseId} postId={post.databaseId} />
        </div>
        <div className="md:w-5/12 lg:w-4/12">
          <FeaturedSidebar
            featuredReviews={featuredReviews}
            featuredTags={featuredTags}
            featuredVideos={featuredVideos}
          />
        </div>
      </div>
      <RecommendedPosts posts={featuredPosts} />
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let paginatedPosts: IPaginatedPostsResponse | null = null;
  try {
    paginatedPosts = await getPaginatedPosts({ offset: 0, size: 50 });
  } catch (e) {
    console.log(
      "Fetching paginatedPosts failed, generating paths for blog posts with []",
      e
    );
  }

  const paths: { params: { slug: string } }[] =
    paginatedPosts?.posts.edges.map((post) => ({
      params: { slug: post.node.slug }
    })) || [];
  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
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

    featuredTags = extractFeaturedTags(
      options[optionsTags.tags] as FeaturedOptionTags
    );

    featuredReviews = extractFeaturedReviews(options);

    featuredVideos = extractFeaturedVideos(options);

    featuredPosts = await extractFeaturedPosts(
      options[optionsTags["featured-articles"]] as FeaturedArticles,
      post?.categories.edges[0].node.slug,
      post?.databaseId
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
        },
        revalidate: DEFAULT_REVALIDATION_TIME
      }
    : { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
};
