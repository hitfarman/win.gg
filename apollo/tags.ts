import { gql } from "@apollo/client";
import { client } from "./init";
import { IGetTagSlugsResponse, ITagSlug } from "@/interfaces/tags";

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

  console.log("WE FETCHED ALL THE TAG SLUGS", allTagSlugs);
  console.log(
    "WE FETCHED ALL THE TAG SLUGS AND THE LENGTH IS",
    allTagSlugs.length
  );

  return allTagSlugs;
};
