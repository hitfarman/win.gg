import { IPageInfo, IPageInfoBySlugResponse } from "@/interfaces/pageInfo";
import { gql } from "@apollo/client";
import { client } from "@/apollo/init";

const GET_PAGE_INFO_BY_SLUG = gql`
  query GetPageInfo($slug: ID = "") {
    page(id: $slug, idType: URI) {
      content
      seo {
        fullHead
      }
    }
  }
`;

export const getPageInfoBySlug = async (slug: string): Promise<IPageInfo> => {
  const response = await client.query<IPageInfoBySlugResponse>({
    query: GET_PAGE_INFO_BY_SLUG,
    variables: { slug }
  });
  return response.data.page;
};
