export interface ICategorySlug {
  node: {
    slug: string;
  };
}

export interface IGetCategorySlugsResponse {
  categories: { edges: ICategorySlug[] };
}
