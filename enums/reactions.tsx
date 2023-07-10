import Emoji from "@/components/Emoji";

export const emojiLookup = {
  11: <Emoji label="Smiling Face with Heart Eyes" symbol="😍" />,
  14: <Emoji label="Winking Face with Tongue" symbol="😜" />,
  26: <Emoji label="Crying Face" symbol="😢" />,
  28: <Emoji label="Face with Steam From Nose" symbol="😤" />,
  42: <Emoji label="Hushed Face" symbol="😯" />,
  64: <Emoji label="Thumbs Up" symbol="👍" />
};

export type EmojiId = "11" | "14" | "26" | "28" | "42" | "64";

export const reactionOrder = {
  11: 3,
  14: 2,
  26: 6,
  28: 5,
  42: 4,
  64: 1
};
