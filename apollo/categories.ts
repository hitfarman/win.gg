import {
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

export const getCategorySlugs = async (): Promise<ICategorySlug[]> => {
  const response = await client.query<IGetCategorySlugsResponse>({
    query: GET_CATEGORY_SLUGS
  });
  return response.data.categories.edges;
};
