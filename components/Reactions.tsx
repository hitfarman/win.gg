import { EmojiId, emojiLookup, reactionOrder } from "@/enums/reactions";
import { IReaction } from "@/interfaces/reactions";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Skeleton from "./Skeleton";
import {
  reactToPost,
  getReactionCookie,
  getReactionsByPostId
} from "@/axios/reactions";
import { increaseOrDecreaseCountForReaction } from "@/utils/increaseOrDecreaseCountForReaction";

type Props = {
  postId: number;
};

const Reactions: FC<Props> = ({ postId }) => {
  // State
  const [reactId, setReactId] = useState<string | null>(null);
  const [userReactedOn, setUserReactedOn] = useState<EmojiId | null>(null);
  const [reactions, setReactions] = useState<IReaction[]>([]);
  const [reactionsLoading, setReactionsLoading] = useState<boolean>(true);

  // Memo
  // Be sends [] if reaction is 0
  const filledReactions: IReaction[] = useMemo(() => {
    return Object.keys(emojiLookup).map((key) => {
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
  }, [reactions]);

  // Methods
  const reactionClicked = async (emoji_id: EmojiId) => {
    if (reactId) {
      try {
        const status = await reactToPost({
          id: String(postId),
          reactionId: Number(emoji_id),
          react_id: reactId
        });
        let previousReaction: EmojiId | null;
        if (status === 200) {
          setUserReactedOn((prev) => {
            previousReaction = prev;
            return emoji_id;
          });
          setReactions((prev) => {
            if (previousReaction === emoji_id) {
              return prev;
            } else {
              if (!prev.find((reaction) => reaction.emoji_id === emoji_id)) {
                prev.push({ count: 0, emoji_id });
              }
              return prev.map((reaction) =>
                increaseOrDecreaseCountForReaction(
                  reaction,
                  previousReaction,
                  emoji_id
                )
              );
            }
          });
        }
      } catch (e) {
        return;
      }
    }
  };

  const getReactIdCookie = useCallback(async () => {
    try {
      const reactionCookie = (await getReactionCookie()).cookie;
      setReactId(reactionCookie);
    } catch (e) {
      setReactId(null);
      setReactionsLoading(false);
    }
  }, []);

  const getReactions = useCallback(async () => {
    if (reactId) {
      setReactionsLoading(true);
      try {
        const reactionsRes = await getReactionsByPostId(postId, reactId);
        setReactions(reactionsRes.counts);
        setUserReactedOn(reactionsRes.user.emoji_id);
      } catch (e) {
        setReactions([]);
      } finally {
        setReactionsLoading(false);
      }
    }
  }, [reactId, postId]);

  // Effects
  useEffect(() => {
    getReactIdCookie();
  }, [getReactIdCookie]);

  useEffect(() => {
    getReactions();
  }, [getReactions]);

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
              {reactionsLoading ? (
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
