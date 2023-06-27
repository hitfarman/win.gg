import { gql } from "@apollo/client";
import { client } from "@/apollo/init";
import { IFeaturedPost, IPost, IPostDetails } from "@/interfaces/posts";

export const GET_POSTS = gql`
  query GetAllPosts {
    posts {
      nodes {
        title
        content
        uri
        date
        slug
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

export const getAllPosts = async (): Promise<IPost[]> => {
  const response = await client.query({ query: GET_POSTS });
  return response.data.posts.nodes as IPost[];
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
