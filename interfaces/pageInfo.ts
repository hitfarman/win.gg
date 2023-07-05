import { StaticImageData } from "next/image";

export interface IPageInfoBySlugResponse {
  page: IPageInfo;
}

export interface IPageInfo {
  content: string;
  seo: { fullHead: string };
}

export interface IAboutUsCardInfo {
  image: StaticImageData;
  name: string;
  position: string;
  email: string;
}
