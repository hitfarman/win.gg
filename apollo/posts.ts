import { gql } from "@apollo/client";
import { client } from "@/apollo/init";
import {
  IFeaturedPost,
  IPaginatedPostsResponse,
  IPostDetails,
  IPostQueryVariables
} from "@/interfaces/posts";

export const GET_PAGINATED_POSTS = gql`
  query getPosts(
    $first: Int = 0
    $after: String = ""
    $before: String = ""
    $last: Int = 0
  ) {
    posts(first: $first, after: $after, before: $before, last: $last) {
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          slug
          date
          excerpt
          author {
            node {
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
            }
          }
        }
      }
    }
  }
`;

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      content
      date
      slug
      title
      status
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          firstName
          lastName
          email
        }
      }
    }
  }
`;

const GET_FEATURED_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      date
      slug
      title
      excerpt
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      author {
        node {
          firstName
          lastName
        }
      }
    }
  }
`;

export const getPaginatedPosts = async (
  variables: IPostQueryVariables
): Promise<IPaginatedPostsResponse> => {
  const response = await client.query({
    query: GET_PAGINATED_POSTS,
    variables
  });
  return response.data as IPaginatedPostsResponse;
};

export const getPostBySlug = async (slug: string): Promise<IPostDetails> => {
  const response = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug }
  });
  return response.data.post as IPostDetails;
};

export const getFeaturedPostBySlug = async (
  slug: string
): Promise<IFeaturedPost> => {
  const response = await client.query({
    query: GET_FEATURED_POST_BY_SLUG,
    variables: { slug }
  });
  return response.data.post as IFeaturedPost;
};
