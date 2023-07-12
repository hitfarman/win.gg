export interface IPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  seo: { metaDesc: string };
  author: { node: { firstName: string; lastName: string; slug: string } };
  featuredImage: { node: { altText: string; sourceUrl: string } };
  categories: { nodes: { name: string; slug: string }[] };
}

export interface IPaginatedPostsResponse {
  posts: {
    edges: { node: IPost }[];
    pageInfo: {
      offsetPagination: {
        hasMore: boolean;
        hasPrevious: boolean;
        total: number;
      };
    };
  };
}

export interface IPostBySlugResponse {
  post: IPostDetails;
}
export interface IPostDetails {
  categories: {
    edges: { node: { slug: string; name: string } }[];
  };
  author: {
    node: {
      slug: string;
      lastName: string;
      firstName: string;
    };
  };
  databaseId: number;
  slug: string;
  seo: {
    fullHead: string;
  };
  title: string;
  date: string;
  content: string;
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
      title: string;
    };
  };
  tags: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

export interface IFeaturedPost {
  date: string;
  slug: string;
  title: string;
  seo: {
    metaDesc: string;
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  };
  author: {
    node: {
      slug: string;
      firstName: string;
      lastName: string;
    };
  };
}

export interface IPostQueryVariables {
  offset?: number;
  size?: number;
  categoryName?: string;
  tag?: string;
  authorName?: string;
}
