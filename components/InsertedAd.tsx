import React, { FC } from "react";

type Props = {
  className: string;
  placeholderClassName?: string;
  id: string;
};

const InsertedAd: FC<Props> = ({ className, placeholderClassName, id }) => {
  return (
    <div id={id} className={`relative flex items-center ${className}`}>
      <p
        className={`absolute inset-0 -z-10 flex items-center justify-center ${placeholderClassName}`}
      >
        Advertisement
      </p>
    </div>
  );
};

export default InsertedAd;
