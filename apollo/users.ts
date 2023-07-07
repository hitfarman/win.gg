import { gql } from "@apollo/client";
import { client } from "@/apollo/init";
import { IAuthor, IGetUsersBySlugResponse } from "@/interfaces/users";

const GET_USERS_BY_SLUG = gql`
  query getUsersBySlug($slug: String = "") {
    users(where: { nicename: $slug }) {
      edges {
        node {
          avatar {
            url
            foundAvatar
          }
          description
          name
          seo {
            fullHead
          }
          slug
        }
      }
    }
  }
`;

export const getAuthorBySlug = async (
  slug: string
): Promise<IAuthor | null> => {
  const response = await client.query<IGetUsersBySlugResponse>({
    query: GET_USERS_BY_SLUG,
    variables: { slug }
  });
  return response.data.users.edges.length > 0
    ? response.data.users.edges[0].node
    : null;
};
