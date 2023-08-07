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
  isReviewPage?: boolean;
  pageParamIsInUrl: boolean;
  frontendOrigin: string;
};

const PaginationNumbers: FC<Props> = ({
  pageNumber,
  siblingCount,
  total,
  className,
  isReviewPage,
  pageParamIsInUrl,
  frontendOrigin
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
              className={`${
                isReviewPage
                  ? "win-secondary-button-yellow"
                  : "win-secondary-button"
              }`}
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
            className={`${
              isReviewPage
                ? "win-secondary-button-yellow"
                : "win-secondary-button"
            } ${
              page === pageNumber
                ? isReviewPage
                  ? "bg-win-yellow-hover"
                  : "bg-win-primary-hover"
                : ""
            }`}
            href={`${frontendOrigin}${calculateNavLink({
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
