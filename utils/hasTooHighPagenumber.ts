import { POSTS_PER_PAGE } from "@/constants/posts";

export const hasTooHighPagenumber = (
  totalCount: number,
  currentPage: number
): boolean => {
  const totalPageCount = Math.ceil(totalCount / POSTS_PER_PAGE);

  return currentPage > totalPageCount;
};
