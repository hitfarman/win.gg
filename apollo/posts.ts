import { gql } from "@apollo/client";
import { client } from "@/apollo/init";
import {
  IFeaturedPost,
  IPaginatedPostsResponse,
  IPostByCategoryAndDateResponse,
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
    $authorName: String = ""
  ) {
    posts(
      where: {
        tag: $tag
        categoryName: $categoryName
        offsetPagination: { offset: $offset, size: $size }
        authorName: $authorName
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
          databaseId
          title
          slug
          date
          excerpt
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

export const GET_FIRST_POST_IN_CATEGORY_BY_YEAR_AND_MONTH = gql`
  query getFirstPostInCategoryByYearAndMonth(
    $month: Int = 0
    $year: Int = 0
    $categoryName: String = ""
  ) {
    posts(
      where: {
        dateQuery: { month: $month, year: $year }
        categoryName: $categoryName
      }
      first: 1
    ) {
      nodes {
        id
      }
    }
  }
`;

export const GET_PAGINATED_POSTS_FILTERED_BY_DATE = gql`
  query getPaginatedPosts(
    $offset: Int = 0
    $size: Int = ${POSTS_PER_PAGE}
    $categoryName: String = ""
    $tag: String = ""
    $authorName: String = ""
    $month: Int = 0
    $year: Int = 0
  ) {
    posts(
      where: {
        tag: $tag
        categoryName: $categoryName
        offsetPagination: { offset: $offset, size: $size }
        authorName: $authorName
        dateQuery: { year: $year, month: $month }
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
          databaseId
          title
          slug
          date
          excerpt
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
          slug
          lastName
          firstName
        }
      }
      databaseId
      slug
      seo {
        fullHead
        title
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
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

const GET_FEATURED_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
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
          slug
          firstName
          lastName
        }
      }
    }
  }
`;

export const getFirstPostInCategoryByYearAndMonth = async (
  variables: IPostQueryVariables
): Promise<IPostByCategoryAndDateResponse> => {
  const response = await client.query<IPostByCategoryAndDateResponse>({
    query: GET_FIRST_POST_IN_CATEGORY_BY_YEAR_AND_MONTH,
    variables
  });

  return response.data;
};

export const getPaginatedPosts = async (
  variables: IPostQueryVariables
): Promise<IPaginatedPostsResponse> => {
  const response = await client.query({
    query: GET_PAGINATED_POSTS,
    variables
  });
  return response.data as IPaginatedPostsResponse;
};

export const getPaginatedPostsFilteredByDate = async (
  variables: IPostQueryVariables
): Promise<IPaginatedPostsResponse> => {
  const response = await client.query({
    query: GET_PAGINATED_POSTS_FILTERED_BY_DATE,
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
