import { getPaginatedPosts } from "@/apollo/posts";
import { getAuthorBySlug } from "@/apollo/users";
import { getAllOptions } from "@/axios/options";
import FeaturedReviews from "@/components/FeaturedReviews";
import FeaturedTags from "@/components/FeaturedTags";
import FeaturedVideosSecondary from "@/components/FeaturedVideosSecondary";
import PostList from "@/components/PostList";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { IAllOptionsResponse } from "@/interfaces/options";
import { IPaginatedPostsResponse } from "@/interfaces/posts";
import { IFeaturedReview } from "@/interfaces/reviews";
import { IFeaturedTag } from "@/interfaces/tags";
import { IAuthor } from "@/interfaces/users";
import { IFeaturedVideo } from "@/interfaces/videos";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
import { extractFeaturedReviews } from "@/utils/extractFeaturedReviews";
import { extractFeaturedTags } from "@/utils/extractFeaturedTags";
import { extractFeaturedVideos } from "@/utils/extractFeaturedVideos";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";
import parse from "html-react-parser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";

type Props = {
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  featuredTags: IFeaturedTag[];
  paginatedPosts: IPaginatedPostsResponse | null;
  author: IAuthor;
};

const AuthorPage: NextPage<Props> = ({
  author,
  featuredReviews,
  featuredTags,
  featuredVideos,
  paginatedPosts
}) => {
  return (
    <>
      <Head>{parse(author.seo.fullHead || "")}</Head>
      <div className="my-10">
        <Breadcrumbs
          crumbs={[{ text: author.name, url: `/news/author/${author.slug}` }]}
        />
      </div>
      <h1 className="border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        {author.name}
      </h1>
      <div className="flex flex-col gap-5 border-b-2 border-b-white py-10 md:flex-row">
        <Image
          src={author.avatar.url}
          alt={author.name}
          width={100}
          height={100}
          className="rounded-full object-cover md:self-center"
          priority
        />
        <div className="flex-1">
          <h2 className="mb-2 font-header text-xl font-semibold sm:text-2xl">
            About the author
          </h2>
          <p className="text-sm text-win-slate sm:text-base">
            {author.description || `${author.name} ,author at WIN.gg`}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex-1">
          <PostList paginatedPosts={paginatedPosts} title="" />
        </div>
        <div className="md:w-4/12">
          <FeaturedTags tags={featuredTags} />
          <FeaturedReviews reviews={featuredReviews} />
          <FeaturedVideosSecondary featuredVideos={featuredVideos} />
        </div>
      </div>
    </>
  );
};

export default AuthorPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  context.res.setHeader(
    "Cache-control",
    "public, s-maxage=300, stale-while-revalidate=30"
  );
  const { params } = context.params as { params: string[] };
  const authorNiceName = params[0];
  const pageNumber = params[2];

  let featuredVideos: IFeaturedVideo[] = [];
  let featuredReviews: IFeaturedReview[] = [];
  let featuredTags: IFeaturedTag[] = [];
  let options: IAllOptionsResponse | null = null;
  let paginatedPosts: IPaginatedPostsResponse | null = null;
  let author: IAuthor | null = null;

  try {
    author = await getAuthorBySlug(authorNiceName);
  } catch (e) {
    console.log(
      "Fetching author details failed in getServerSideProps, with cause:",
      e
    );
  }

  if (!author) {
    return { notFound: true };
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
    featuredTags = extractFeaturedTags(options["default-tags"]);
    featuredReviews = extractFeaturedReviews(options);
    featuredVideos = extractFeaturedVideos(options);
  }

  try {
    paginatedPosts = await getPaginatedPosts({
      size: POSTS_PER_PAGE,
      offset: pageNumber ? calculatePaginationOffset(Number(pageNumber)) : 0,
      authorName: authorNiceName
    });
  } catch (e) {
    console.log("Fetching paginated posts failed with cause:", e);
  }

  return {
    props: {
      featuredVideos,
      featuredReviews,
      featuredTags,
      paginatedPosts,
      author
    }
  };
};
