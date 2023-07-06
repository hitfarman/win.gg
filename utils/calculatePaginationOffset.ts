import { POSTS_PER_PAGE } from "@/constants/posts";

export const calculatePaginationOffset = (pageNbr: number): number => {
  return (pageNbr - 1) * POSTS_PER_PAGE;
};
