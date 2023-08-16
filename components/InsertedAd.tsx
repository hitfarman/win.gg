import React, { FC } from "react";

type Props = {
  className: string;
  id: string;
};

const InsertedAd: FC<Props> = ({ className, id }) => {
  return (
    <div id={id} className={`relative flex items-center ${className}`}>
      <p className="absolute inset-0 -z-10 flex items-center justify-center">
        Advertisement
      </p>
    </div>
  );
};

export default InsertedAd;
