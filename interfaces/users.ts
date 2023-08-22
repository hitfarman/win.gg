export interface IAuthor {
  avatar: {
    url: string;
    foundAvatar: boolean;
  };
  description: string;
  name: string;
  seo: {
    fullHead: string;
    title: string;
  };
  slug: string;
}

export interface IGetUsersBySlugResponse {
  users: { edges: { node: IAuthor }[] };
}
