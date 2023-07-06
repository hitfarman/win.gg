import { generatePageNumbers } from "@/utils/generatePageNumbers";
import React, { FC } from "react";

type Props = {
  changePage: (type: "next" | "prev" | "direct", to?: number) => void;
  siblingCount: number;
  pageNumber: number;
  total: number;
  className?: string;
};

const PaginationNumbers: FC<Props> = ({
  changePage,
  pageNumber,
  siblingCount,
  total,
  className
}) => {
  return (
    <div className={className || ""}>
      {generatePageNumbers({
        siblingCount: siblingCount,
        currentPage: pageNumber,
        totalCount: total || pageNumber
      }).map((page, i) => (
        <button
          key={`${page}-pagination-button-${typeof page === "string" ? i : ""}`}
          className={`win-secondary-button ${
            page === pageNumber ? "bg-win-primary-hover" : ""
          }`}
          onClick={() => {
            if (typeof page === "number") changePage("direct", page);
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationNumbers;
