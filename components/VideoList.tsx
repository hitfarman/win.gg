import React, { FC } from "react";
import { useRouter } from "next/router";
import PaginationNumbers from "@/components/PaginationNumbers";
import { IPaginatedVideosResponse } from "@/interfaces/videos";
import VideoCard from "@/components/VideoCard";

type Props = {
  paginatedVideos: IPaginatedVideosResponse | null;
  title?: string;
};

const VideoList: FC<Props> = ({ paginatedVideos, title }) => {
  const { asPath, push } = useRouter();
  const pageParamIsInUrl = /\/page\/\d+/.test(asPath);
  const pageNumber = pageParamIsInUrl ? parseInt(asPath.split("/page/")[1]) : 1;

  // Methods
  const changePage = (type: "next" | "prev" | "direct", to?: number) => {
    if (type === "next") {
      if (!pageParamIsInUrl) {
        return push(
          `${asPath}${asPath[asPath.length - 1] === "/" ? "" : "/"}page/2`
        );
      }

      return push(
        asPath.replace(`/page/${pageNumber}`, `/page/${pageNumber + 1}`)
      );
    }
    if (type === "prev") {
      if (pageNumber === 2) {
        return push(asPath.replace(`/page/${pageNumber}`, "/"));
      }

      return push(
        asPath.replace(`/page/${pageNumber}`, `/page/${pageNumber - 1}`)
      );
    }
    if (type === "direct") {
      if (to === 1) {
        return push(asPath.replace(`/page/${pageNumber}`, "/"));
      }

      if (!pageParamIsInUrl) {
        return push(
          `${asPath}${asPath[asPath.length - 1] === "/" ? "" : "/"}page/${to}`
        );
      }

      return push(asPath.replace(`/page/${pageNumber}`, `/page/${to}`));
    }
  };

  return (
    <>
      {title && (
        <h3 className="mb-10 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
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
        changePage={changePage}
        pageNumber={pageNumber}
        siblingCount={1}
        total={
          paginatedVideos?.videos.pageInfo.offsetPagination.total || pageNumber
        }
      />
      <div className="mt-5 flex justify-center gap-5">
        {paginatedVideos?.videos.pageInfo.offsetPagination.hasPrevious && (
          <button
            className="win-secondary-button"
            onClick={() => changePage("prev")}
          >
            Previous
          </button>
        )}
        <PaginationNumbers
          className="hidden gap-2 sm:flex"
          changePage={changePage}
          pageNumber={pageNumber}
          siblingCount={1}
          total={
            paginatedVideos?.videos.pageInfo.offsetPagination.total ||
            pageNumber
          }
        />
        {paginatedVideos?.videos.pageInfo.offsetPagination.hasMore && (
          <button
            className="win-secondary-button"
            onClick={() => changePage("next")}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default VideoList;
