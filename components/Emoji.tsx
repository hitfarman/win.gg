import React, { FC } from "react";

type Props = {
  label: string;
  symbol: string;
};

const Emoji: FC<Props> = ({ label, symbol }) => (
  <span
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </span>
);
export default Emoji;
