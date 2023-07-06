import { gql } from "@apollo/client";
import { client } from "@/apollo/init";
import {
  IFeaturedPost,
  IPaginatedPostsResponse,
  IPostBySlugResponse,
  IPostDetails,
  IPostQueryVariables
} from "@/interfaces/posts";
import { POSTS_PER_PAGE } from "@/constants/posts";

export const GET_PAGINATED_POSTS = gql`
  query getPaginatedPosts(
    $offset: Int = 0
    $size: Int = ${POSTS_PER_PAGE}
    $categoryName: String = ""
    $tag: String = ""
  ) {
    posts(
      where: {
        tag: $tag
        categoryName: $categoryName
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
              slug
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
      categories {
        edges {
          node {
            slug
            name
          }
        }
      }
      author {
        node {
          lastName
          firstName
        }
      }
      slug
      seo {
        fullHead
      }
      title
      date
      content
      featuredImage {
        node {
          altText
          sourceUrl
          title
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
          slug
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
  const response = await client.query<IPostBySlugResponse>({
    query: GET_POST_BY_SLUG,
    variables: { slug }
  });
  return response.data.post;
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
