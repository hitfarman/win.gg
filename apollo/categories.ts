import {
  ICategoryInfo,
  ICategoryInfoResponse,
  ICategorySlug,
  IGetCategorySlugsResponse
} from "@/interfaces/categories";
import { gql } from "@apollo/client";
import { client } from "./init";

// First 100 items to get all categories for sure
const GET_CATEGORY_SLUGS = gql`
  query GetCategorySlugs {
    categories(first: 100) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

const GET_CATEGORY_INFO_BY_SLUGS = gql`
  query GetCategoryBySlug($slug: ID = "") {
    category(id: $slug, idType: SLUG) {
      name
      slug
      seo {
        breadcrumbs {
          text
          url
        }
        fullHead
      }
    }
  }
`;

export const getCategorySlugs = async (): Promise<ICategorySlug[]> => {
  const response = await client.query<IGetCategorySlugsResponse>({
    query: GET_CATEGORY_SLUGS
  });
  return response.data.categories.edges;
};

export const getCategoryInfoBySlug = async (
  slug: string
): Promise<ICategoryInfo> => {
  const response = await client.query<ICategoryInfoResponse>({
    query: GET_CATEGORY_INFO_BY_SLUGS,
    variables: { slug }
  });
  return response.data.category;
};
