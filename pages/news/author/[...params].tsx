import { getPaginatedPosts } from "@/apollo/posts";
import { getAuthorBySlug } from "@/apollo/users";
import { getAllOptions } from "@/axios/options";
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
import React from "react";

type Props = {
  featuredVideos: IFeaturedVideo[];
  featuredReviews: IFeaturedReview[];
  featuredTags: IFeaturedTag[];
  paginatedPosts: IPaginatedPostsResponse | null;
  author: IAuthor;
};

const AuthorPage: NextPage<Props> = (props) => {
  return <div>{JSON.stringify(props, null, 10)}</div>;
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
