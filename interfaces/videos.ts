export interface IFeaturedVideo {
  url: string;
}

export interface IVideo {
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  seo: {
    metaDesc: string;
  };
  author: {
    node: {
      slug: string;
      firstName: string;
      lastName: string;
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  videoLink: {
    youtubeLink: string;
  };
}

export interface IPaginatedVideosResponse {
  videos: {
    nodes: IVideo[];
    pageInfo: {
      offsetPagination: {
        total: number;
        hasPrevious: boolean;
        hasMore: boolean;
      };
    };
  };
}

export interface IGetPaginatedVideosVariables {
  offset: number;
  size: number;
}

export interface IVideoDetails {
  title: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  tags: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  date: string;
  seo: {
    fullHead: string;
  };
  author: {
    node: {
      slug: string;
      firstName: string;
      lastName: string;
    };
  };
  videoLink: {
    youtubeLink: string;
  };
  slug: string;
}

export interface IGetVideosBySlugResponse {
  videos: { nodes: IVideoDetails[] };
}
