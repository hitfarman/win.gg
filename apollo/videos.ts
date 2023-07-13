import { POSTS_PER_PAGE } from "@/constants/posts";
import { client } from "@/apollo/init";
import {
  IGetPaginatedVideosVariables,
  IGetVideosBySlugResponse,
  IPaginatedVideosResponse,
  IVideoDetails
} from "@/interfaces/videos";
import { gql } from "@apollo/client";

const GET_PAGINATED_VIDEOS = gql`
query getPaginatedVideos(
  $offset: Int = 0
  $size: Int = ${POSTS_PER_PAGE}
){
  videos(where: {offsetPagination: { offset: $offset, size: $size }}) {
    nodes {
      databaseId
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
      categories {
        nodes {
          name
          slug
        }
      }
      videoLink {
        youtubeLink
      }
    }
    pageInfo {
      offsetPagination {
        total
        hasPrevious
        hasMore
      }
    }
  }
}
`;

// Cannot get video entity by slug so I query videos instead where there is a possibility for searching by slug
// This is necessary because we have to follow the original url-s from legacy site
const GET_VIDEOS_BY_SLUG = gql`
  query getVideoBySlug($slug: String = "") {
    videos(where: { name: $slug }) {
      nodes {
        title
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        date
        seo {
          fullHead
        }
        author {
          node {
            slug
            firstName
            lastName
          }
        }
        videoLink {
          youtubeLink
        }
      }
    }
  }
`;

export const getPaginatedVideos = async (
  variables: IGetPaginatedVideosVariables
): Promise<IPaginatedVideosResponse> => {
  const response = await client.query<IPaginatedVideosResponse>({
    query: GET_PAGINATED_VIDEOS,
    variables
  });
  return response.data;
};

export const getVideoBySlug = async (
  slug: string
): Promise<IVideoDetails | null> => {
  const response = await client.query<IGetVideosBySlugResponse>({
    query: GET_VIDEOS_BY_SLUG,
    variables: { slug }
  });

  if (response.data.videos.nodes.length !== 1) {
    return null;
  } else {
    return response.data.videos.nodes[0];
  }
};
