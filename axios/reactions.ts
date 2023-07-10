import { apiSSR } from "./init";
import { IReaction } from "@/interfaces/reactions";

export const getReactionsByPostId = async (
  postId: number
): Promise<IReaction[]> => {
  const response = await apiSSR.get<IReaction[]>(`/reactions/news/${postId}`);
  return response.data;
};
