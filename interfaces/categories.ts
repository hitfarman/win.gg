import { IBreadcrumb } from "./navigation";

export interface ICategorySlug {
  node: {
    name: string;
    slug: string;
  };
}

export interface IGetCategorySlugsResponse {
  categories: { edges: ICategorySlug[] };
}

export interface ICategoryInfoResponse {
  category: ICategoryInfo;
}

export interface ICategoryInfo {
  slug: string;
  seo: {
    breadcrumbs: IBreadcrumb[];
    fullHead: string;
    title: string;
  };
  name: string;
}
