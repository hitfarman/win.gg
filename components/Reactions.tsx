import { EmojiId, emojiLookup, reactionOrder } from "@/enums/reactions";
import { IReaction } from "@/interfaces/reactions";
import React, { FC } from "react";
import Skeleton from "./Skeleton";

type Props = {
  reactions: IReaction[];
  reactionClicked: (emoji_id: EmojiId) => void;
  userReactedOn: EmojiId | null;
  loading: boolean;
};

const Reactions: FC<Props> = ({
  reactions,
  reactionClicked,
  userReactedOn,
  loading
}) => {
  // Be sends [] if reaction is 0
  const filledReactions: IReaction[] = Object.keys(emojiLookup).map((key) => {
    const reactionFound = reactions.find(
      (reaction) => reaction.emoji_id === key
    );
    return reactionFound
      ? { ...reactionFound, order: reactionOrder[key as EmojiId] }
      : {
          count: 0,
          emoji_id: key as EmojiId,
          order: reactionOrder[key as EmojiId]
        };
  });

  return (
    <div className="my-7">
      <h3 className="mb-7 text-center font-header text-2xl font-semibold">
        What do you think?
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {filledReactions
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((reaction) => (
            <div
              className="group flex flex-col items-center gap-1 px-1 sm:gap-2"
              key={`${reaction.emoji_id}-reaction-emoji`}
            >
              {loading ? (
                <>
                  <Skeleton className="h-12 w-full !rounded-3xl" />
                  <Skeleton className="h-3 w-5 pb-5 sm:pb-3" />
                </>
              ) : (
                <>
                  <button
                    className={`w-full rounded-3xl py-2 text-xl transition-all group-hover:scale-110  group-hover:bg-win-primary sm:text-2xl ${
                      reaction.emoji_id === userReactedOn
                        ? "bg-win-primary"
                        : "bg-win-gray"
                    }`}
                    onClick={() => reactionClicked(reaction.emoji_id)}
                  >
                    {emojiLookup[reaction.emoji_id]}
                  </button>
                  <p className="text-base font-semibold transition-all group-hover:text-win-primary sm:text-lg">
                    {reaction.count}
                  </p>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reactions;
