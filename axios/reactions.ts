import { api, apiNext } from "@/axios/init";
import {
  IGetReactionCookieRes,
  IGetReactionsResponse,
  IReactToPostBody,
  IReactToPostRes
} from "@/interfaces/reactions";

export const getReactionsByPostId = async (
  postId: number,
  react_id: string
): Promise<IGetReactionsResponse> => {
  const response = await api.post<IGetReactionsResponse>(
    `/reactions/news/${postId}`,
    { react_id }
  );
  return response.data;
};

export const getReactionCookie = async (): Promise<IGetReactionCookieRes> => {
  const response = await apiNext.get<IGetReactionCookieRes>(
    "/getReactionCookie"
  );
  return response.data;
};

export const reactToPost = async (
  reactionData: IReactToPostBody
): Promise<number> => {
  const response = await api.post<IReactToPostRes>(
    "/reactions/update",
    reactionData
  );
  return response.data.req.status;
};
