export interface IPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: { node: { firstName: string; lastName: string } };
  featuredImage: { node: { altText: string; sourceUrl: string } };
  categories: { nodes: { name: string }[] };
}

export interface IPaginatedPostsResponse {
  posts: {
    edges: { node: IPost }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string;
      startCursor: string;
    };
  };
}

export interface IPostDetails {
  content: string;
  date: string;
  slug: string;
  title: string;
  status: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  author: {
    node: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export interface IFeaturedPost {
  date: string;
  slug: string;
  title: string;
  excerpt: string;
  categories: {
    nodes: {
      name: string;
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
      firstName: string;
      lastName: string;
    };
  };
}

export interface IPostQueryVariables {
  first: number | null;
  last: number | null;
  before: string | null;
  after: string | null;
  where?: { categoryName: string };
}
