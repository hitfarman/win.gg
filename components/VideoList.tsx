import React, { FC, useMemo } from "react";
import { useRouter } from "next/router";
import PaginationNumbers from "@/components/PaginationNumbers";
import { IPaginatedVideosResponse } from "@/interfaces/videos";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";
import Head from "next/head";
import { frontendOrigin } from "@/constants/general";
import { stripQueryFromPath } from "@/utils/stripQueryFromPath";

type Props = {
  paginatedVideos: IPaginatedVideosResponse | null;
  title?: string;
};

const VideoList: FC<Props> = ({ paginatedVideos, title }) => {
  const { asPath } = useRouter();
  const cleanAsPath = stripQueryFromPath(asPath);
  const pageParamIsInUrl = /\/page\/\d+/.test(cleanAsPath);
  const pageNumber = pageParamIsInUrl
    ? parseInt(cleanAsPath.split("/page/")[1])
    : 1;

  const nextLink = useMemo<string>(() => {
    if (!pageParamIsInUrl) {
      return `${cleanAsPath}page/2`;
    }
    return `${cleanAsPath.replace(
      `/page/${pageNumber}`,
      `/page/${pageNumber + 1}`
    )}`;
  }, [cleanAsPath, pageParamIsInUrl, pageNumber]);
  const prevLink = useMemo<string>(() => {
    if (pageNumber === 2) {
      // There is no / before page only here because of trailingSlash
      return `${cleanAsPath.replace(`/page/${pageNumber}`, "")}`;
    }

    return `${cleanAsPath.replace(
      `/page/${pageNumber}`,
      `/page/${pageNumber - 1}`
    )}`;
  }, [cleanAsPath, pageNumber]);

  return (
    <>
      <Head>
        {paginatedVideos?.videos.pageInfo.offsetPagination.hasMore && (
          <link rel="next" href={frontendOrigin + nextLink} />
        )}
        {paginatedVideos?.videos.pageInfo.offsetPagination.hasPrevious && (
          <link rel="prev" href={frontendOrigin + prevLink} />
        )}
      </Head>
      {title && (
        <h3 className="mb-10 border-b-2 border-b-win-primary pb-5 font-header text-4xl font-semibold">
          {title}
        </h3>
      )}
      <div>
        {paginatedVideos ? (
          paginatedVideos?.videos.nodes.map((video) => (
            <VideoCard key={video.databaseId} video={video} />
          ))
        ) : (
          <p>Sorry, there are currently no videos available!</p>
        )}
      </div>

      <PaginationNumbers
        className="mt-5 flex flex-wrap justify-center gap-2 text-xs sm:hidden"
        pageNumber={pageNumber}
        siblingCount={1}
        total={
          paginatedVideos?.videos.pageInfo.offsetPagination.total || pageNumber
        }
        pageParamIsInUrl={pageParamIsInUrl}
      />
      <div className="mt-5 flex justify-center gap-5">
        {paginatedVideos?.videos.pageInfo.offsetPagination.hasPrevious && (
          <Link className="win-secondary-button" href={prevLink}>
            Previous
          </Link>
        )}
        <PaginationNumbers
          className="hidden gap-2 sm:flex"
          pageNumber={pageNumber}
          siblingCount={1}
          total={
            paginatedVideos?.videos.pageInfo.offsetPagination.total ||
            pageNumber
          }
          pageParamIsInUrl={pageParamIsInUrl}
        />
        {paginatedVideos?.videos.pageInfo.offsetPagination.hasMore && (
          <Link className="win-secondary-button" href={nextLink}>
            Next
          </Link>
        )}
      </div>
    </>
  );
};

export default VideoList;
