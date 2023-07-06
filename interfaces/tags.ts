export interface IFeaturedTag {
  term_id: number;
  name: string;
  slug: string;
}

export interface ITagSlug {
  slug: string;
}

export interface IGetTagSlugsResponse {
  tags: {
    nodes: ITagSlug[];
    pageInfo: { hasNextPage: boolean; endCursor: string };
  };
}
