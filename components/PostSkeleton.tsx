import React from "react";
import Skeleton from "./Skeleton";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 pb-5 lg:flex-row">
      <Skeleton className="h-[350px] lg:h-[250px] lg:min-w-[350px]" />
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-5 w-10" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
};

export default PostSkeleton;
