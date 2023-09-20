import React, { FC } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { IVideo } from "@/interfaces/videos";
import LazyYoutubeVideo from "./LazyYoutubeVideo";

type Props = {
  video: IVideo;
};

const VideoCard: FC<Props> = ({ video }) => {
  return (
    <div
      className={`mb-5 grid grid-cols-1 grid-rows-[275px_1fr] gap-5 pb-5 lg:mb-0 lg:grid-cols-2 lg:grid-rows-1`}
    >
      <LazyYoutubeVideo
        url={video.videoLink.youtubeLink}
        width={350}
        height={250}
      />

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {video.categories.nodes.map((category) => (
            <Link
              className="win-tag-button"
              href={`/${category.slug}`}
              key={category.name}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <Link
          className={`cursor-pointer font-header text-2xl font-semibold transition-colors hover:text-win-primary`}
          href={`/videos/${video.slug}`}
        >
          <h3>{video.title}</h3>
        </Link>

        <div className="flex gap-2 text-sm font-bold text-gray-500">
          <Link
            href={`/author/${video.author.node.slug}`}
            className="transition-colors hover:text-gray-300"
          >
            By {`${video.author.node.firstName} ${video.author.node.lastName}`}
          </Link>
          <p>|</p>
          <p>{formatDate(video.date)}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
