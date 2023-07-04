import React from "react";

const LinearLoading = () => {
  return (
    <div className=" linear-loading-fade-in absolute inset-x-0 bottom-0 h-1 w-full overflow-hidden bg-win-gray">
      <div className="linear-loading-animation h-1 w-5/6 bg-win-primary/60 md:w-3/6" />
    </div>
  );
};

export default LinearLoading;
