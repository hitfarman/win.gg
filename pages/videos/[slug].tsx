import { getAllOptions } from "@/axios/options";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  FeaturedArticles,
  FeaturedOptionTags,
  IAllOptionsResponse
} from "@/interfaces/options";
import { IFeaturedPost } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IFeaturedVideo, IVideoDetails } from "@/interfaces/videos";
import { getFeaturedOptionKeyNamesByCategorySlug } from "@/utils/getFeaturedOptionKeyNamesByCategorySlug";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import parse from "html-react-parser";
import RecommendedPosts from "@/components/RecommendedPosts";
import Head from "next/head";
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
import { getVideoBySlug } from "@/apollo/videos";
import LazyYoutubeVideo from "@/components/LazyYoutubeVideo";
import { parseSeo } from "@/utils/parseSeo";
import FeaturedSidebar from "@/components/FeaturedSidebar";
import { DEFAULT_REVALIDATION_TIME } from "@/constants/posts";

type Props = {
  featuredPosts: IFeaturedPost[];
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  featuredTags: IFeaturedTag[];
  video: IVideoDetails;
};

const PostPage: NextPage<Props> = ({
  featuredPosts,
  featuredReviews,
  featuredTags,
  featuredVideos,
  video
}) => {
  const { asPath } = useRouter();
  const shareUrl = `https://${process.env.NEXT_PUBLIC_FE_DOMAIN}${asPath}`;

  return (
    <>
      <Head>
        {parse(video.seo.fullHead || "", {
          replace: parseSeo
        })}
      </Head>
      <Breadcrumbs
        crumbs={[
          {
            text: video.categories.nodes[0].name,
            url: `/${video.categories.nodes[0].slug}`
          },
          {
            text: video.title,
            url: `/videos/${video.slug}`
          }
        ]}
      />
      <div className="flex flex-col gap-10 pb-10 pt-5 md:flex-row">
        <div className="flex-1">
          <div className="mb-5 flex flex-wrap gap-2">
            {video.categories.nodes.map((category) => (
              <Link
                key={`${category.name}-category-btn`}
                href={`/${category.slug}`}
                className="win-tag-button"
              >
                {category.name}
              </Link>
            ))}
            {video.tags.nodes.map((tag) => (
              <Link
                key={`${tag.name}-tag-btn`}
                href={`/${tag.slug}`}
                className="win-tag-button"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <h2 className="mb-2 font-header text-2xl font-semibold">
            {video.title}
          </h2>

          <div className="mb-2 flex gap-2 text-sm font-bold text-gray-500">
            <Link
              href={`/news/author/${video.author.node.slug}`}
              className="transition-colors hover:text-gray-300"
            >
              By{" "}
              {`${video.author.node.firstName} ${video.author.node.lastName}`}
            </Link>
            <p>|</p>
            <p>{formatDate(video.date)}</p>
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
          </div>
          <div>
            <LazyYoutubeVideo
              width={800}
              height={350}
              url={video.videoLink.youtubeLink}
              sizesForNextImg="(max-width: 768px) 100vw,(max-width: 1024px) 50vw, 66vw"
            />
          </div>
        </div>
        <div className="md:w-4/12">
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
  let video: IVideoDetails | null = null;

  try {
    video = await getVideoBySlug(slug);
  } catch (e) {
    console.log(
      "Fetching video details failed in getServerSideProps, with cause:",
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
      video?.categories.nodes.length ? video.categories.nodes[0].slug : ""
    );

    featuredTags = extractFeaturedTags(
      options[optionsTags.tags] as FeaturedOptionTags
    );

    featuredReviews = extractFeaturedReviews(options);

    featuredVideos = extractFeaturedVideos(options);

    featuredPosts = await extractFeaturedPosts(
      options[optionsTags["featured-articles"]] as FeaturedArticles,
      video?.categories.nodes[0].slug
    );
  }

  return video
    ? {
        props: {
          featuredPosts,
          featuredVideos,
          featuredReviews,
          featuredTags,
          video
        }
      }
    : { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
};
