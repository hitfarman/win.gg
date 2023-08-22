import { gql } from "@apollo/client";
import { client } from "./init";
import {
  IGetTagSlugsResponse,
  ITagInfo,
  ITagInfoResponse,
  ITagSlug
} from "@/interfaces/tags";

const GET_TAG_SLUGS = gql`
  query GetTagSlugs($after: String = "", $first: Int = 100) {
    tags(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_TAG_INFO_BY_SLUG = gql`
  query GetTagInfoBySlug($slug: ID = "", $idType: TagIdType = SLUG) {
    tag(idType: $idType, id: $slug) {
      seo {
        breadcrumbs {
          text
          url
        }
        fullHead
        title
      }
      slug
      name
    }
  }
`;

export const getTagSlugs = async (
  numberOfTags: number,
  after: string
): Promise<IGetTagSlugsResponse> => {
  const response = await client.query<IGetTagSlugsResponse>({
    query: GET_TAG_SLUGS,
    variables: { first: numberOfTags, after }
  });
  return response.data;
};

export const getAllTagSlugs = async (): Promise<ITagSlug[]> => {
  let allTagSlugs: ITagSlug[] = [];
  let after = "";
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await getTagSlugs(100, after);
    allTagSlugs = [...allTagSlugs, ...res.tags.nodes];

    hasNextPage = res.tags.pageInfo.hasNextPage;
    after = res.tags.pageInfo.endCursor;
  }

  return allTagSlugs;
};

export const getTagInfoBySlug = async (slug: string): Promise<ITagInfo> => {
  const response = await client.query<ITagInfoResponse>({
    query: GET_TAG_INFO_BY_SLUG,
    variables: { slug }
  });
  return response.data.tag;
};
