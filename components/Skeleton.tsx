import React, { FC } from "react";

type Props = {
  className?: string;
};

const Skeleton: FC<Props> = ({ className }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-win-slate/30 ${className || ""}`}
    />
  );
};

export default Skeleton;
