import { EmojiId } from "@/enums/reactions";
import { IReaction } from "@/interfaces/reactions";

export const increaseOrDecreaseCountForReaction = (
  reaction: IReaction,
  previousReaction: EmojiId | null,
  emoji_id: EmojiId
): IReaction => {
  if (reaction.emoji_id === previousReaction) {
    return { ...reaction, count: Number(reaction.count) - 1 };
  } else if (reaction.emoji_id === emoji_id) {
    return { ...reaction, count: Number(reaction.count) + 1 };
  } else {
    return reaction;
  }
};
