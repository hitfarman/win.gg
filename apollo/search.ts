import { POSTS_PER_PAGE } from "@/constants/posts";
import { IPaginatedPostsResponse } from "@/interfaces/posts";
import { gql } from "@apollo/client";
import { client } from "./init";
import { ISearchByQueryVariables } from "@/interfaces/search";

const SEARCH_BY_QUERY = gql`
  query SearchByQuery(
    $offset: Int = 0
    $size: Int = ${POSTS_PER_PAGE}
    $search: String = ""
  ) {
    posts(
      where: {
        search: $search
        offsetPagination: { offset: $offset, size: $size }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      edges {
        node {
          id
          title
          slug
          date
          seo {
            metaDesc
          }
          author {
            node {
              slug
              firstName
              lastName
            }
          }
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const searchByQuery = async (
  variables: ISearchByQueryVariables
): Promise<IPaginatedPostsResponse> => {
  const response = await client.query<IPaginatedPostsResponse>({
    query: SEARCH_BY_QUERY,
    variables
  });
  return response.data as IPaginatedPostsResponse;
};
