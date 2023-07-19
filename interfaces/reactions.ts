import { EmojiId } from "@/enums/reactions";

export interface IReaction {
  emoji_id: EmojiId;
  count: number;
  order?: number;
}

export interface IGetReactionsResponse {
  counts: IReaction[];
  user: { emoji_id: EmojiId } | null;
}
export interface IGetReactionCookieRes {
  cookie: string;
}

export interface IReactToPostBody {
  id: string;
  reactionId: number;
  react_id: string;
}
export interface IReactToPostRes {
  req: { status: number };
}
