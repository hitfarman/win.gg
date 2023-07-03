import { IBreadcrumb } from "@/interfaces/navigation";
import { HomeIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  crumbs: IBreadcrumb[];
};

const Breadcrumbs: FC<Props> = ({ crumbs }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {crumbs.map(({ text, url }, i) => (
          <li key={`${text}-breadcrumb`}>
            <div className="flex items-center">
              <ChevronDoubleRightIcon
                className="h-5 w-5 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={url}
                className={`ml-4 text-sm font-medium transition-colors ${
                  i === crumbs.length - 1
                    ? "text-gray-300 hover:text-gray-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-current={i === crumbs.length - 1 ? "page" : undefined}
              >
                {text}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
