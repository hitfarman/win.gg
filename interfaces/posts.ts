export interface IPost {
  title: string;
  content: string;
  uri: string;
  date: string;
  slug: string;
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
    };
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
