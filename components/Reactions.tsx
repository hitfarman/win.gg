import { EmojiId, emojiLookup } from "@/enums/reactions";
import { IReaction } from "@/interfaces/reactions";
import React, { FC } from "react";

type Props = {
  postId: number;
  reactions: IReaction[];
};

const Reactions: FC<Props> = ({ postId, reactions }) => {
  // Be sends [] if reaction is 0
  const filledReactions: IReaction[] = Object.keys(emojiLookup).map((key) => {
    const reactionFound = reactions.find(
      (reaction) => reaction.emoji_id === key
    );
    return reactionFound
      ? reactionFound
      : { count: 0, emoji_id: key as EmojiId };
  });

  return (
    <div className="my-7">
      <h3 className="mb-7 text-center font-header text-2xl font-semibold">
        What do you think?
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {filledReactions.map((reaction) => (
          <div
            className="group flex flex-col items-center gap-1 px-1 sm:gap-2"
            key={`${reaction.emoji_id}-reaction-emoji`}
          >
            <button className="w-full rounded-3xl bg-win-gray py-2 text-xl transition-all group-hover:scale-110  group-hover:bg-win-primary sm:text-2xl">
              {emojiLookup[reaction.emoji_id]}
            </button>
            <p className="text-base font-semibold transition-all group-hover:text-win-primary sm:text-lg">
              {reaction.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reactions;
