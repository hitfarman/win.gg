import { gql } from "@apollo/client";
import { client } from "@/apollo/init";
import { IPost, IPostDetails } from "@/interfaces/posts";

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
