import Link from "next/link";
import React, { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    document.head.querySelector('link[rel="canonical"]')?.remove();
  });
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-5 pb-5 text-center">
        <h1 className="font-header text-4xl font-semibold">404</h1>
        <h2 className="font-header text-2xl font-semibold">No results found</h2>
        <h3 className="font-header text-base text-win-slate">
          The page you requested could not be found. Try refining your search,
          or use the navigation above to locate the post..
        </h3>
        <Link href="/" className="win-primary-button">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
