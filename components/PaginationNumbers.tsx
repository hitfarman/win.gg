import { frontendOrigin } from "@/constants/general";
import { calculateNavLink } from "@/utils/calculateNavLink";
import { generatePageNumbers } from "@/utils/generatePageNumbers";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  siblingCount: number;
  pageNumber: number;
  total: number;
  className?: string;
  pageParamIsInUrl: boolean;
};

const PaginationNumbers: FC<Props> = ({
  pageNumber,
  siblingCount,
  total,
  className,

  pageParamIsInUrl
}) => {
  const { asPath } = useRouter();
  return (
    <div className={className || ""}>
      {generatePageNumbers({
        siblingCount: siblingCount,
        currentPage: pageNumber,
        totalCount: total || pageNumber
      }).map((page, i) => {
        if (typeof page !== "number") {
          return (
            <button
              key={`${page}-pagination-button-${
                typeof page === "string" ? i : ""
              }`}
              className="win-secondary-button"
            >
              {page}
            </button>
          );
        }

        return (
          <Link
            key={`${page}-pagination-button-${
              typeof page === "string" ? i : ""
            }`}
            className={`win-secondary-button ${
              page === pageNumber ? "bg-win-primary-hover" : ""
            }`}
            href={`${calculateNavLink({
              asPath: asPath,
              to: page,
              pageNumber,
              pageParamIsInUrl
            })}`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
};

export default PaginationNumbers;
