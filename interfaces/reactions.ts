import { EmojiId } from "@/enums/reactions";

export interface IReaction {
  emoji_id: EmojiId;
  count: number;
}
