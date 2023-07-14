import { apiSSR } from "@/axios/init";

export const getPageSeoBySlug = async (
  slug: string
): Promise<{ yoast_head: string }> => {
  let yoast_head = "";
  const response = await apiSSR.get(`/wp/v2/pages?slug=${slug}`);
  if (response.data[0].yoast_head) {
    yoast_head = response.data[0].yoast_head;
  }

  return { yoast_head };
};
